import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  LinearProgress,
  IconButton,
  Alert,
  Snackbar,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as ProgressIcon,
  EmojiEvents as TrophyIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GengarMascot } from "../components/gengar/GengarMascot";
import { NavegacaoPrincipal } from "../components/navegacao/NavegacaoPrincipal";
import { useDadosFinanceiros } from "../hooks/useDadosFinanceiros";
import { Meta } from "../types/financas";
import { obterDataAtualFormatada, criarDataDeInput } from "../utils/timezone";

export default function Metas() {
  const { dados, adicionarMeta, atualizarMeta, excluirMeta } =
    useDadosFinanceiros();

  const [dialogAberto, setDialogAberto] = useState(false);
  const [metaEditando, setMetaEditando] = useState<Meta | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"success" | "error">(
    "success",
  );

  const [formulario, setFormulario] = useState({
    titulo: "",
    valorAlvo: "",
    dataInicio: new Date().toISOString().split("T")[0],
    dataFim: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    ativa: true,
  });

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const calcularProgresso = (meta: Meta) => {
    return Math.min((meta.valorAtual / meta.valorAlvo) * 100, 100);
  };

  const abrirDialog = (meta?: Meta) => {
    if (meta) {
      setMetaEditando(meta);
      setFormulario({
        titulo: meta.titulo,
        valorAlvo: meta.valorAlvo.toString(),
        dataInicio: meta.dataInicio.toISOString().split("T")[0],
        dataFim: meta.dataFim.toISOString().split("T")[0],
        ativa: meta.ativa,
      });
    } else {
      setMetaEditando(null);
      setFormulario({
        titulo: "",
        valorAlvo: "",
        dataInicio: new Date().toISOString().split("T")[0],
        dataFim: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        ativa: true,
      });
    }
    setDialogAberto(true);
  };

  const handleSalvar = () => {
    if (!formulario.titulo || !formulario.valorAlvo) {
      setMensagem("Preencha todos os campos obrigatórios!");
      setTipoMensagem("error");
      return;
    }

    try {
      if (metaEditando) {
        atualizarMeta(metaEditando.id, {
          titulo: formulario.titulo,
          valorAlvo: parseFloat(formulario.valorAlvo),
          dataInicio: new Date(formulario.dataInicio),
          dataFim: new Date(formulario.dataFim),
          ativa: formulario.ativa,
        });
        setMensagem("Meta atualizada com sucesso! 🎯");
      } else {
        adicionarMeta({
          titulo: formulario.titulo,
          valorAlvo: parseFloat(formulario.valorAlvo),
          valorAtual: 0,
          dataInicio: new Date(formulario.dataInicio),
          dataFim: new Date(formulario.dataFim),
          ativa: formulario.ativa,
        });
        setMensagem("Meta criada com sucesso! 🎯");
      }

      setTipoMensagem("success");
      setDialogAberto(false);
    } catch (error) {
      setMensagem("Erro ao salvar meta 😢");
      setTipoMensagem("error");
    }
  };

  const handleExcluir = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta meta?")) {
      excluirMeta(id);
      setMensagem("Meta excluída com sucesso!");
      setTipoMensagem("success");
    }
  };

  const atualizarValorAtual = (meta: Meta, novoValor: number) => {
    atualizarMeta(meta.id, { valorAtual: novoValor });
    setMensagem("Progresso atualizado! 📈");
    setTipoMensagem("success");
  };

  const metasAtivas = dados.metas.filter((m) => m.ativa);
  const metasConcluidas = dados.metas.filter(
    (m) => m.valorAtual >= m.valorAlvo,
  );

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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 4,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <GengarMascot size="md" animate={true} />
              <Box>
                <Typography variant="h4" color="white" fontWeight="bold">
                  Sistema de Metas
                </Typography>
                <Typography variant="subtitle1" color="rgba(255,255,255,0.7)">
                  Defina e acompanhe seus objetivos financeiros
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => abrirDialog()}
              sx={{
                background: "linear-gradient(45deg, #9654FF, #7C2AFF)",
                "&:hover": {
                  background: "linear-gradient(45deg, #7C2AFF, #5D0FFF)",
                },
              }}
            >
              Nova Meta
            </Button>
          </Box>
        </motion.div>

        {/* Estatísticas das metas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 32 }}
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
                  border: "1px solid rgba(150, 84, 255, 0.2)",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h3" color="#9654FF" fontWeight="bold">
                    {dados.metas.length}
                  </Typography>
                  <Typography color="rgba(255,255,255,0.7)">
                    Total de Metas
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05))",
                  border: "1px solid rgba(76, 175, 80, 0.2)",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h3" color="#4CAF50" fontWeight="bold">
                    {metasAtivas.length}
                  </Typography>
                  <Typography color="rgba(255,255,255,0.7)">
                    Metas Ativas
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 193, 7, 0.05))",
                  border: "1px solid rgba(255, 193, 7, 0.2)",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h3" color="#FFC107" fontWeight="bold">
                    {metasConcluidas.length}
                  </Typography>
                  <Typography color="rgba(255,255,255,0.7)">
                    Concluídas
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>

        {/* Lista de Metas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {dados.metas.length === 0 ? (
            <Card
              sx={{
                background:
                  "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
                border: "1px solid rgba(150, 84, 255, 0.2)",
              }}
            >
              <CardContent sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h2">🎯</Typography>
                <Typography variant="h6" color="white" gutterBottom>
                  Nenhuma meta definida ainda!
                </Typography>
                <Typography color="rgba(255,255,255,0.7)" sx={{ mb: 3 }}>
                  Comece criando sua primeira meta financeira
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => abrirDialog()}
                  sx={{
                    background: "linear-gradient(45deg, #9654FF, #7C2AFF)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #7C2AFF, #5D0FFF)",
                    },
                  }}
                >
                  Criar Primeira Meta
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {dados.metas.map((meta) => {
                const progresso = calcularProgresso(meta);
                const isConcluida = meta.valorAtual >= meta.valorAlvo;

                return (
                  <Grid item xs={12} md={6} lg={4} key={meta.id}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Card
                        sx={{
                          background: isConcluida
                            ? "linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 193, 7, 0.05))"
                            : meta.ativa
                              ? "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))"
                              : "linear-gradient(135deg, rgba(128, 128, 128, 0.1), rgba(128, 128, 128, 0.05))",
                          border: isConcluida
                            ? "1px solid rgba(255, 193, 7, 0.2)"
                            : meta.ativa
                              ? "1px solid rgba(150, 84, 255, 0.2)"
                              : "1px solid rgba(128, 128, 128, 0.2)",
                          height: "100%",
                          position: "relative",
                          overflow: "visible",
                        }}
                      >
                        {isConcluida && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: -10,
                              right: -10,
                              background:
                                "linear-gradient(45deg, #FFC107, #FF9800)",
                              borderRadius: "50%",
                              width: 40,
                              height: 40,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TrophyIcon sx={{ color: "white", fontSize: 20 }} />
                          </Box>
                        )}

                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              mb: 2,
                            }}
                          >
                            <Typography
                              variant="h6"
                              color="white"
                              fontWeight="bold"
                              sx={{ flex: 1 }}
                            >
                              {meta.titulo}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 0.5 }}>
                              <IconButton
                                size="small"
                                onClick={() => abrirDialog(meta)}
                                sx={{
                                  color: "rgba(255,255,255,0.7)",
                                  "&:hover": { color: "#9654FF" },
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleExcluir(meta.id)}
                                sx={{
                                  color: "rgba(255,255,255,0.7)",
                                  "&:hover": { color: "#F44336" },
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>

                          <Typography
                            variant="body2"
                            color="rgba(255,255,255,0.7)"
                            sx={{ mb: 2 }}
                          >
                            {format(meta.dataInicio, "dd/MM/yyyy", {
                              locale: ptBR,
                            })}{" "}
                            até{" "}
                            {format(meta.dataFim, "dd/MM/yyyy", {
                              locale: ptBR,
                            })}
                          </Typography>

                          <Box sx={{ mb: 2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="body2"
                                color="rgba(255,255,255,0.7)"
                              >
                                Progresso
                              </Typography>
                              <Typography
                                variant="body2"
                                color="white"
                                fontWeight="bold"
                              >
                                {progresso.toFixed(1)}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={progresso}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: "rgba(255,255,255,0.1)",
                                "& .MuiLinearProgress-bar": {
                                  borderRadius: 4,
                                  background: isConcluida
                                    ? "linear-gradient(90deg, #FFC107, #FF9800)"
                                    : "linear-gradient(90deg, #9654FF, #7C2AFF)",
                                },
                              }}
                            />
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="rgba(255,255,255,0.7)"
                            >
                              Valor Atual:
                            </Typography>
                            <Typography
                              variant="body2"
                              color="#4CAF50"
                              fontWeight="bold"
                            >
                              {formatarMoeda(meta.valorAtual)}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 3,
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="rgba(255,255,255,0.7)"
                            >
                              Meta:
                            </Typography>
                            <Typography
                              variant="body2"
                              color="white"
                              fontWeight="bold"
                            >
                              {formatarMoeda(meta.valorAlvo)}
                            </Typography>
                          </Box>

                          {!isConcluida && meta.ativa && (
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                  const novoValor = prompt(
                                    `Valor atual: ${formatarMoeda(meta.valorAtual)}\nDigite o novo valor:`,
                                    meta.valorAtual.toString(),
                                  );
                                  if (novoValor && !isNaN(Number(novoValor))) {
                                    atualizarValorAtual(
                                      meta,
                                      Number(novoValor),
                                    );
                                  }
                                }}
                                sx={{
                                  borderColor: "rgba(150, 84, 255, 0.5)",
                                  color: "#9654FF",
                                  "&:hover": {
                                    borderColor: "#9654FF",
                                    backgroundColor: "rgba(150, 84, 255, 0.1)",
                                  },
                                  flex: 1,
                                }}
                              >
                                <ProgressIcon sx={{ mr: 1, fontSize: 16 }} />
                                Atualizar
                              </Button>
                            </Box>
                          )}

                          {isConcluida && (
                            <Alert
                              severity="success"
                              sx={{
                                backgroundColor: "rgba(76, 175, 80, 0.1)",
                                color: "#4CAF50",
                                "& .MuiAlert-icon": { color: "#4CAF50" },
                              }}
                            >
                              Meta concluída! Parabéns! 🎉
                            </Alert>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </motion.div>

        {/* Dialog para criar/editar meta */}
        <Dialog
          open={dialogAberto}
          onClose={() => setDialogAberto(false)}
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
          <DialogTitle sx={{ color: "white" }}>
            {metaEditando ? "Editar Meta" : "Nova Meta"}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1, "& > *": { mb: 2 } }}>
              <TextField
                fullWidth
                label="Título da Meta"
                value={formulario.titulo}
                onChange={(e) =>
                  setFormulario({ ...formulario, titulo: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(150, 84, 255, 0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(150, 84, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#9654FF" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              />

              <TextField
                fullWidth
                label="Valor Alvo (R$)"
                type="number"
                inputProps={{ step: "0.01", min: "0" }}
                value={formulario.valorAlvo}
                onChange={(e) =>
                  setFormulario({ ...formulario, valorAlvo: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(150, 84, 255, 0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(150, 84, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#9654FF" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              />

              <TextField
                fullWidth
                label="Data de Início"
                type="date"
                value={formulario.dataInicio}
                onChange={(e) =>
                  setFormulario({ ...formulario, dataInicio: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(150, 84, 255, 0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(150, 84, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#9654FF" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              />

              <TextField
                fullWidth
                label="Data de Fim"
                type="date"
                value={formulario.dataFim}
                onChange={(e) =>
                  setFormulario({ ...formulario, dataFim: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(150, 84, 255, 0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(150, 84, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#9654FF" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={formulario.ativa}
                    onChange={(e) =>
                      setFormulario({ ...formulario, ativa: e.target.checked })
                    }
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#9654FF",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        { backgroundColor: "#9654FF" },
                    }}
                  />
                }
                label="Meta Ativa"
                sx={{ color: "white" }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDialogAberto(false)}
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSalvar}
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #9654FF, #7C2AFF)",
                "&:hover": {
                  background: "linear-gradient(45deg, #7C2AFF, #5D0FFF)",
                },
              }}
            >
              {metaEditando ? "Atualizar" : "Criar"}
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
