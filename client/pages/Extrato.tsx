import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
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
  Chip,
  Alert,
  Snackbar,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  FileDownload as ExportIcon,
  TrendingUp as GanhoIcon,
  TrendingDown as DespesaIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GengarMascot } from "../components/gengar/GengarMascot";
import { NavegacaoPrincipal } from "../components/navegacao/NavegacaoPrincipal";
import { useDadosFinanceiros } from "../hooks/useDadosFinanceiros";
import {
  FiltroExtrato,
  Transacao,
  ICONES_CATEGORIAS_DESPESA,
  ICONES_CATEGORIAS_GANHO,
  NOMES_CATEGORIAS_DESPESA,
  NOMES_CATEGORIAS_GANHO,
} from "../types/financas";
import { obterDataBrasilia, criarDataDeInput } from "../utils/timezone";

export default function Extrato() {
  const { obterTransacoesFiltradas, exportarCSV } = useDadosFinanceiros();

  const [filtro, setFiltro] = useState<FiltroExtrato>({
    periodo: "30dias",
    tipo: "todos",
  });

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"success" | "error">(
    "success",
  );

  const [transacaoSelecionada, setTransacaoSelecionada] =
    useState<Transacao | null>(null);

  const transacoes = obterTransacoesFiltradas(filtro);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const handleExportarCSV = () => {
    const nomeArquivo = `extrato-gengar-${format(obterDataBrasilia(), "yyyy-MM", { locale: ptBR })}`;
    exportarCSV(transacoes, nomeArquivo);
    setMensagem("Extrato exportado com sucesso! 📄");
    setTipoMensagem("success");
  };

  const obterTotalPeriodo = () => {
    const totalEntradas = transacoes
      .filter((t) => t.tipo === "ganho")
      .reduce((sum, t) => sum + t.valor, 0);

    const totalSaidas = transacoes
      .filter((t) => t.tipo === "despesa")
      .reduce((sum, t) => sum + t.valor, 0);

    return { totalEntradas, totalSaidas, saldo: totalEntradas - totalSaidas };
  };

  const totais = obterTotalPeriodo();

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
                Extrato de Transações
              </Typography>
              <Typography variant="subtitle1" color="rgba(255,255,255,0.7)">
                Visualize e filtre todas as suas movimentações
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {/* Filtros */}
          <Grid item xs={12} md={4}>
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
                    <FilterIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Filtros
                  </Typography>

                  <Box sx={{ "& > *": { mb: 2 } }}>
                    <TextField
                      fullWidth
                      select
                      label="Período"
                      value={filtro.periodo}
                      onChange={(e) =>
                        setFiltro({
                          ...filtro,
                          periodo: e.target.value as FiltroExtrato["periodo"],
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
                      <MenuItem value="7dias">Últimos 7 dias</MenuItem>
                      <MenuItem value="30dias">Últimos 30 dias</MenuItem>
                      <MenuItem value="personalizado">Personalizado</MenuItem>
                    </TextField>

                    {filtro.periodo === "personalizado" && (
                      <>
                        <TextField
                          fullWidth
                          label="Data Início"
                          type="date"
                          value={
                            filtro.dataInicio?.toISOString().split("T")[0] || ""
                          }
                          onChange={(e) =>
                            setFiltro({
                              ...filtro,
                              dataInicio: criarDataDeInput(e.target.value),
                            })
                          }
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "rgba(150, 84, 255, 0.3)",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "rgba(255,255,255,0.7)",
                            },
                          }}
                        />
                        <TextField
                          fullWidth
                          label="Data Fim"
                          type="date"
                          value={
                            filtro.dataFim?.toISOString().split("T")[0] || ""
                          }
                          onChange={(e) =>
                            setFiltro({
                              ...filtro,
                              dataFim: new Date(e.target.value),
                            })
                          }
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "rgba(150, 84, 255, 0.3)",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "rgba(255,255,255,0.7)",
                            },
                          }}
                        />
                      </>
                    )}

                    <TextField
                      fullWidth
                      select
                      label="Tipo"
                      value={filtro.tipo || "todos"}
                      onChange={(e) =>
                        setFiltro({
                          ...filtro,
                          tipo: e.target.value as FiltroExtrato["tipo"],
                        })
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "& fieldset": {
                            borderColor: "rgba(150, 84, 255, 0.3)",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    >
                      <MenuItem value="todos">Todos</MenuItem>
                      <MenuItem value="ganho">Entradas</MenuItem>
                      <MenuItem value="despesa">Saídas</MenuItem>
                    </TextField>

                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<ExportIcon />}
                      onClick={handleExportarCSV}
                      sx={{
                        borderColor: "rgba(150, 84, 255, 0.5)",
                        color: "#9654FF",
                        "&:hover": {
                          borderColor: "#9654FF",
                          backgroundColor: "rgba(150, 84, 255, 0.1)",
                        },
                      }}
                    >
                      Exportar CSV
                    </Button>
                  </Box>
                </CardContent>
              </Card>

              {/* Resumo do período */}
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
                  border: "1px solid rgba(150, 84, 255, 0.2)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="white" gutterBottom>
                    📊 Resumo do Período
                  </Typography>

                  <Box sx={{ space: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography color="rgba(255,255,255,0.7)">
                        Entradas:
                      </Typography>
                      <Typography color="#4CAF50" fontWeight="bold">
                        {formatarMoeda(totais.totalEntradas)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography color="rgba(255,255,255,0.7)">
                        Saídas:
                      </Typography>
                      <Typography color="#F44336" fontWeight="bold">
                        {formatarMoeda(totais.totalSaidas)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        pt: 1,
                        borderTop: "1px solid rgba(150, 84, 255, 0.2)",
                      }}
                    >
                      <Typography color="white" fontWeight="bold">
                        Saldo:
                      </Typography>
                      <Typography
                        color={totais.saldo >= 0 ? "#4CAF50" : "#F44336"}
                        fontWeight="bold"
                      >
                        {formatarMoeda(totais.saldo)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Lista de Transações */}
          <Grid item xs={12} md={8}>
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
                    💰 Transações ({transacoes.length})
                  </Typography>

                  {transacoes.length === 0 ? (
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 8,
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      <Typography variant="h2">👻</Typography>
                      <Typography variant="body2">
                        Nenhuma transação encontrada!
                      </Typography>
                      <Typography variant="caption">
                        Ajuste os filtros ou adicione movimentações
                      </Typography>
                    </Box>
                  ) : (
                    <List sx={{ maxHeight: 600, overflow: "auto" }}>
                      {transacoes.map((transacao) => (
                        <motion.div
                          key={transacao.id}
                          whileHover={{ scale: 1.01, x: 4 }}
                        >
                          <ListItem
                            sx={{
                              borderRadius: 2,
                              mb: 1,
                              backgroundColor:
                                transacao.tipo === "ganho"
                                  ? "rgba(76, 175, 80, 0.1)"
                                  : "rgba(244, 67, 54, 0.1)",
                              "&:hover": {
                                backgroundColor:
                                  transacao.tipo === "ganho"
                                    ? "rgba(76, 175, 80, 0.2)"
                                    : "rgba(244, 67, 54, 0.2)",
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
                                  backgroundColor:
                                    transacao.tipo === "ganho"
                                      ? "rgba(76, 175, 80, 0.2)"
                                      : "rgba(244, 67, 54, 0.2)",
                                }}
                              >
                                {transacao.tipo === "ganho" ? (
                                  <GanhoIcon sx={{ color: "#4CAF50" }} />
                                ) : (
                                  <DespesaIcon sx={{ color: "#F44336" }} />
                                )}
                              </Box>
                            </ListItemIcon>

                            <ListItemText
                              primary={
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                    gap: 1,
                                  }}
                                >
                                  <Box>
                                    <Typography
                                      color="white"
                                      fontWeight="medium"
                                    >
                                      {transacao.descricao}
                                    </Typography>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        mt: 0.5,
                                      }}
                                    >
                                      <span>
                                        {transacao.tipo === "ganho"
                                          ? ICONES_CATEGORIAS_GANHO[
                                              transacao.categoria as keyof typeof ICONES_CATEGORIAS_GANHO
                                            ]
                                          : ICONES_CATEGORIAS_DESPESA[
                                              transacao.categoria as keyof typeof ICONES_CATEGORIAS_DESPESA
                                            ]}
                                      </span>
                                      <Chip
                                        label={
                                          transacao.tipo === "ganho"
                                            ? NOMES_CATEGORIAS_GANHO[
                                                transacao.categoria as keyof typeof NOMES_CATEGORIAS_GANHO
                                              ]
                                            : NOMES_CATEGORIAS_DESPESA[
                                                transacao.categoria as keyof typeof NOMES_CATEGORIAS_DESPESA
                                              ]
                                        }
                                        size="small"
                                        sx={{
                                          backgroundColor:
                                            transacao.tipo === "ganho"
                                              ? "rgba(76, 175, 80, 0.2)"
                                              : "rgba(244, 67, 54, 0.2)",
                                          color: "white",
                                          fontSize: 11,
                                        }}
                                      />
                                      <Typography
                                        variant="caption"
                                        color="rgba(255,255,255,0.7)"
                                      >
                                        {format(
                                          new Date(transacao.data),
                                          "dd/MM/yyyy",
                                          {
                                            locale: ptBR,
                                          },
                                        )}
                                      </Typography>
                                    </Box>
                                  </Box>

                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <Typography
                                      variant="h6"
                                      fontWeight="bold"
                                      color={
                                        transacao.tipo === "ganho"
                                          ? "#4CAF50"
                                          : "#F44336"
                                      }
                                    >
                                      {transacao.tipo === "ganho" ? "+" : "-"}
                                      {formatarMoeda(transacao.valor)}
                                    </Typography>

                                    {(transacao.observacao ||
                                      transacao.comprovante) && (
                                      <IconButton
                                        size="small"
                                        onClick={() =>
                                          setTransacaoSelecionada(transacao)
                                        }
                                        sx={{
                                          color: "rgba(255,255,255,0.7)",
                                          "&:hover": {
                                            color: "#9654FF",
                                            backgroundColor:
                                              "rgba(150, 84, 255, 0.1)",
                                          },
                                        }}
                                      >
                                        <ViewIcon />
                                      </IconButton>
                                    )}
                                  </Box>
                                </Box>
                              }
                            />
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

        {/* Dialog para detalhes da transação */}
        <Dialog
          open={!!transacaoSelecionada}
          onClose={() => setTransacaoSelecionada(null)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              background:
                "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
              border: "1px solid rgba(150, 84, 255, 0.2)",
            },
          }}
        >
          <DialogTitle
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Detalhes da Transação
            <IconButton
              onClick={() => setTransacaoSelecionada(null)}
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {transacaoSelecionada && (
              <Box sx={{ pt: 1 }}>
                <Typography variant="h6" color="white" gutterBottom>
                  {transacaoSelecionada.descricao}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="rgba(255,255,255,0.7)">
                    Valor:
                    <Typography
                      component="span"
                      sx={{
                        ml: 1,
                        color:
                          transacaoSelecionada.tipo === "ganho"
                            ? "#4CAF50"
                            : "#F44336",
                        fontWeight: "bold",
                      }}
                    >
                      {transacaoSelecionada.tipo === "ganho" ? "+" : "-"}
                      {formatarMoeda(transacaoSelecionada.valor)}
                    </Typography>
                  </Typography>
                </Box>

                {transacaoSelecionada.observacao && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body2"
                      color="rgba(255,255,255,0.7)"
                      gutterBottom
                    >
                      Observação:
                    </Typography>
                    <Typography variant="body1" color="white">
                      {transacaoSelecionada.observacao}
                    </Typography>
                  </Box>
                )}

                {transacaoSelecionada.comprovante && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body2"
                      color="rgba(255,255,255,0.7)"
                      gutterBottom
                    >
                      Comprovante:
                    </Typography>
                    <img
                      src={transacaoSelecionada.comprovante}
                      alt="Comprovante"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "300px",
                        borderRadius: "8px",
                        border: "1px solid rgba(150, 84, 255, 0.2)",
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setTransacaoSelecionada(null)}
              sx={{ color: "#9654FF" }}
            >
              Fechar
            </Button>
          </DialogActions>
        </Dialog>

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
