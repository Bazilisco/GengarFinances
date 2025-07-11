import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  TrendingUp as GanhoIcon,
  FileDownload as ExportIcon,
  FileUpload as ImportIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GengarMascot } from "../components/gengar/GengarMascot";
import { useDadosFinanceiros } from "../hooks/useDadosFinanceiros";
import {
  CategoriaGanho,
  ICONES_CATEGORIAS_GANHO,
  CORES_CATEGORIAS_GANHO,
} from "../types/financas";
import { NavegacaoPrincipal } from "../components/navegacao/NavegacaoPrincipal";
import {
  obterDataAtualFormatada,
  criarDataDeInput,
  isMesAtualBrasilia,
} from "../utils/timezone";

export default function Ganhos() {
  const {
    dados,
    adicionarGanho,
    excluirGanho,
    obterGanhosPorCategoria,
    exportarDados,
    importarDados,
  } = useDadosFinanceiros();

  const [formulario, setFormulario] = useState({
    valor: "",
    descricao: "",
    categoria: "salario" as CategoriaGanho,
    data: obterDataAtualFormatada(),
    observacao: "",
    comprovante: undefined as string | undefined,
  });

  // Debug: verificar se a data está sendo definida corretamente
  console.log("Data do formulário:", formulario.data);

  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"success" | "error">(
    "success",
  );

  const categorias: CategoriaGanho[] = [
    "salario",
    "extra",
    "investimentos",
    "vendas",
    "freelance",
    "outros",
  ];

  const categoriasGanhos = obterGanhosPorCategoria();

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formulario.valor || !formulario.descricao) return;

    setCarregando(true);

    try {
      adicionarGanho({
        valor: parseFloat(formulario.valor),
        descricao: formulario.descricao,
        categoria: formulario.categoria,
        data: criarDataDeInput(formulario.data),
      });

      setFormulario({
        valor: "",
        descricao: "",
        categoria: "salario",
        data: obterDataAtualFormatada(),
        observacao: "",
        comprovante: undefined,
      });

      setMensagem("Ganho adicionado com sucesso! 💰");
      setTipoMensagem("success");
    } catch (error) {
      setMensagem("Erro ao adicionar ganho 😢");
      setTipoMensagem("error");
    } finally {
      setCarregando(false);
    }
  };

  const handleImportar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;

    try {
      await importarDados(arquivo);
      setMensagem("Dados importados com sucesso! 📥");
      setTipoMensagem("success");
    } catch (error) {
      setMensagem("Erro ao importar dados 😢");
      setTipoMensagem("error");
    }

    // Limpar input
    event.target.value = "";
  };

  // Filtrar ganhos do mês atual (timezone de Brasília)
  const ganhosDoMes = dados.ganhos.filter((g) => isMesAtualBrasilia(g.data));

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0a0a0a" }}>
      <NavegacaoPrincipal />

      <Box sx={{ p: 3 }}>
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 32 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <GengarMascot size="md" animate={true} />
            <Box>
              <Typography variant="h4" color="white" fontWeight="bold">
                Gestão de Ganhos
              </Typography>
              <Typography variant="subtitle1" color="rgba(255,255,255,0.7)">
                Registre todas as suas receitas fantasmais
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {/* Formulário */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
                  border: "1px solid rgba(150, 84, 255, 0.2)",
                  mb: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="white" gutterBottom>
                    💰 Adicionar Novo Ganho
                  </Typography>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ "& > *": { mb: 2 } }}
                  >
                    <TextField
                      fullWidth
                      label="Valor (R$)"
                      type="number"
                      inputProps={{ step: "0.01", min: "0" }}
                      value={formulario.valor}
                      onChange={(e) =>
                        setFormulario({ ...formulario, valor: e.target.value })
                      }
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "& fieldset": {
                            borderColor: "rgba(150, 84, 255, 0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(150, 84, 255, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#9654FF",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Descrição"
                      value={formulario.descricao}
                      onChange={(e) =>
                        setFormulario({
                          ...formulario,
                          descricao: e.target.value,
                        })
                      }
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "& fieldset": {
                            borderColor: "rgba(150, 84, 255, 0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(150, 84, 255, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#9654FF",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      select
                      label="Categoria"
                      value={formulario.categoria}
                      onChange={(e) =>
                        setFormulario({
                          ...formulario,
                          categoria: e.target.value as CategoriaGanho,
                        })
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "& fieldset": {
                            borderColor: "rgba(150, 84, 255, 0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(150, 84, 255, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#9654FF",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    >
                      {categorias.map((categoria) => (
                        <MenuItem key={categoria} value={categoria}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <span>{ICONES_CATEGORIAS_GANHO[categoria]}</span>
                            {categoria.charAt(0).toUpperCase() +
                              categoria.slice(1)}
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      fullWidth
                      label="Data"
                      type="date"
                      value={formulario.data}
                      onChange={(e) =>
                        setFormulario({ ...formulario, data: e.target.value })
                      }
                      InputLabelProps={{ shrink: true }}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "& fieldset": {
                            borderColor: "rgba(150, 84, 255, 0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(150, 84, 255, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#9654FF",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Observação (opcional)"
                      multiline
                      rows={2}
                      value={formulario.observacao || ""}
                      onChange={(e) =>
                        setFormulario({
                          ...formulario,
                          observacao: e.target.value,
                        })
                      }
                      placeholder="Ex: Pagamento do projeto X"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "& fieldset": {
                            borderColor: "rgba(150, 84, 255, 0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(150, 84, 255, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#9654FF",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />

                    <Box>
                      <Typography
                        variant="body2"
                        color="rgba(255,255,255,0.7)"
                        gutterBottom
                      >
                        Comprovante (opcional)
                      </Typography>
                      <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{
                          borderColor: "rgba(150, 84, 255, 0.3)",
                          color: "rgba(255,255,255,0.7)",
                          "&:hover": {
                            borderColor: "rgba(150, 84, 255, 0.5)",
                          },
                        }}
                      >
                        📷 Anexar Imagem
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setFormulario({
                                  ...formulario,
                                  comprovante: event.target?.result as string,
                                });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          style={{ display: "none" }}
                        />
                      </Button>
                      {formulario.comprovante && (
                        <Box sx={{ mt: 1, textAlign: "center" }}>
                          <img
                            src={formulario.comprovante}
                            alt="Comprovante"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100px",
                              borderRadius: "4px",
                              border: "1px solid rgba(150, 84, 255, 0.2)",
                            }}
                          />
                          <Button
                            size="small"
                            onClick={() =>
                              setFormulario({
                                ...formulario,
                                comprovante: undefined,
                              })
                            }
                            sx={{ display: "block", mt: 1, color: "#F44336" }}
                          >
                            Remover
                          </Button>
                        </Box>
                      )}
                    </Box>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={carregando}
                      startIcon={<AddIcon />}
                      sx={{
                        background: "linear-gradient(45deg, #9654FF, #7C2AFF)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #7C2AFF, #5D0FFF)",
                        },
                        py: 1.5,
                      }}
                    >
                      {carregando ? "Adicionando..." : "Adicionar Ganho"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>

              {/* Botões de Import/Export */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ExportIcon />}
                    onClick={exportarDados}
                    sx={{
                      borderColor: "rgba(150, 84, 255, 0.5)",
                      color: "#9654FF",
                      "&:hover": {
                        borderColor: "#9654FF",
                        backgroundColor: "rgba(150, 84, 255, 0.1)",
                      },
                    }}
                  >
                    Exportar
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    component="label"
                    startIcon={<ImportIcon />}
                    sx={{
                      borderColor: "rgba(150, 84, 255, 0.5)",
                      color: "#9654FF",
                      "&:hover": {
                        borderColor: "#9654FF",
                        backgroundColor: "rgba(150, 84, 255, 0.1)",
                      },
                    }}
                  >
                    Importar
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportar}
                      style={{ display: "none" }}
                    />
                  </Button>
                </Grid>
              </Grid>
            </motion.div>
          </Grid>

          {/* Lista de Ganhos */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
                  border: "1px solid rgba(150, 84, 255, 0.2)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="white" gutterBottom>
                    📈 Ganhos deste Mês ({ganhosDoMes.length})
                  </Typography>

                  {/* Resumo por categoria */}
                  <Box sx={{ mb: 3 }}>
                    <Grid container spacing={1}>
                      {Object.entries(categoriasGanhos)
                        .filter(([_, valor]) => valor > 0)
                        .map(([categoria, valor]) => (
                          <Grid item key={categoria}>
                            <Chip
                              icon={
                                <span>
                                  {
                                    ICONES_CATEGORIAS_GANHO[
                                      categoria as CategoriaGanho
                                    ]
                                  }
                                </span>
                              }
                              label={`${categoria}: ${formatarMoeda(valor)}`}
                              sx={{
                                backgroundColor: `${CORES_CATEGORIAS_GANHO[categoria as CategoriaGanho]}20`,
                                color: "white",
                                border: `1px solid ${CORES_CATEGORIAS_GANHO[categoria as CategoriaGanho]}40`,
                              }}
                            />
                          </Grid>
                        ))}
                    </Grid>
                  </Box>

                  {ganhosDoMes.length === 0 ? (
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 4,
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      <Typography variant="h2">💸</Typography>
                      <Typography variant="body2">
                        Nenhum ganho neste mês!
                      </Typography>
                      <Typography variant="caption">
                        Adicione suas receitas para começar
                      </Typography>
                    </Box>
                  ) : (
                    <List sx={{ maxHeight: 400, overflow: "auto" }}>
                      {ganhosDoMes.map((ganho) => (
                        <motion.div
                          key={ganho.id}
                          whileHover={{ scale: 1.01, x: 4 }}
                        >
                          <ListItem
                            sx={{
                              borderRadius: 2,
                              mb: 1,
                              backgroundColor: "rgba(76, 175, 80, 0.1)",
                              "&:hover": {
                                backgroundColor: "rgba(76, 175, 80, 0.2)",
                              },
                              transition: "all 0.2s ease",
                            }}
                          >
                            <ListItemIcon>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  backgroundColor: "rgba(76, 175, 80, 0.2)",
                                }}
                              >
                                <GanhoIcon sx={{ color: "#4CAF50" }} />
                              </Box>
                            </ListItemIcon>

                            <ListItemText
                              primary={
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography color="white" fontWeight="medium">
                                    {ganho.descricao}
                                  </Typography>
                                  <Typography
                                    variant="h6"
                                    color="#4CAF50"
                                    fontWeight="bold"
                                  >
                                    +{formatarMoeda(ganho.valor)}
                                  </Typography>
                                </Box>
                              }
                              secondary={
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mt: 0.5,
                                  }}
                                >
                                  <span>
                                    {ICONES_CATEGORIAS_GANHO[ganho.categoria]}
                                  </span>
                                  <Typography
                                    variant="caption"
                                    color="rgba(255,255,255,0.7)"
                                  >
                                    {ganho.categoria} •{" "}
                                    {format(new Date(ganho.data), "dd MMM", {
                                      locale: ptBR,
                                    })}
                                  </Typography>
                                </Box>
                              }
                            />

                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                onClick={() => excluirGanho(ganho.id)}
                                sx={{
                                  color: "rgba(255,255,255,0.5)",
                                  "&:hover": {
                                    color: "#F44336",
                                    backgroundColor: "rgba(244, 67, 54, 0.1)",
                                  },
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </motion.div>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Snackbar para mensagens */}
        <Snackbar
          open={!!mensagem}
          autoHideDuration={4000}
          onClose={() => setMensagem("")}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setMensagem("")}
            severity={tipoMensagem}
            sx={{ width: "100%" }}
          >
            {mensagem}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
