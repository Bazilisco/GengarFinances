import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import {
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { GengarMascot } from "../components/gengar/GengarMascot";
import { NavegacaoPrincipal } from "../components/navegacao/NavegacaoPrincipal";
import { useDadosFinanceiros } from "../hooks/useDadosFinanceiros";
import {
  LimiteCategoria,
  CategoriaDespesa,
  NOMES_CATEGORIAS_DESPESA,
  ICONES_CATEGORIAS_DESPESA,
} from "../types/financas";
import {
  obterMesAtualBrasilia,
  obterAnoAtualBrasilia,
} from "../utils/timezone";

export default function Configuracoes() {
  const {
    dados,
    atualizarConfiguracaoSeguranca,
    adicionarLimiteCategoria,
    obterDespesasPorCategoria,
  } = useDadosFinanceiros();

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"success" | "error">(
    "success",
  );

  // Estados para configuração de PIN
  const [pinAtivado, setPinAtivado] = useState(
    dados.configuracaoSeguranca?.pinAtivado || false,
  );
  const [pin, setPin] = useState("");
  const [confirmarPin, setConfirmarPin] = useState("");

  // Estados para alertas
  const [dialogLimiteAberto, setDialogLimiteAberto] = useState(false);
  const [limiteEditando, setLimiteEditando] = useState<LimiteCategoria | null>(
    null,
  );
  const [formularioLimite, setFormularioLimite] = useState({
    categoria: "alimentacao" as CategoriaDespesa,
    valorLimite: "",
    mes: new Date().getMonth(),
    ano: new Date().getFullYear(),
  });

  // Solicitar permissão para notificações
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const handleSalvarPin = () => {
    if (pinAtivado) {
      if (!pin || pin.length !== 4 || isNaN(Number(pin))) {
        setMensagem("PIN deve ter exatamente 4 dígitos!");
        setTipoMensagem("error");
        return;
      }

      if (pin !== confirmarPin) {
        setMensagem("PINs não coincidem!");
        setTipoMensagem("error");
        return;
      }

      atualizarConfiguracaoSeguranca({
        pinAtivado: true,
        pin: pin,
      });

      setMensagem("PIN configurado com sucesso! 🔐");
      setTipoMensagem("success");
    } else {
      atualizarConfiguracaoSeguranca({
        pinAtivado: false,
        pin: undefined,
      });

      setMensagem("PIN removido com sucesso!");
      setTipoMensagem("success");
    }

    setPin("");
    setConfirmarPin("");
  };

  const abrirDialogLimite = (limite?: LimiteCategoria) => {
    if (limite) {
      setLimiteEditando(limite);
      setFormularioLimite({
        categoria: limite.categoria,
        valorLimite: limite.valorLimite.toString(),
        mes: limite.mes,
        ano: limite.ano,
      });
    } else {
      setLimiteEditando(null);
      setFormularioLimite({
        categoria: "alimentacao",
        valorLimite: "",
        mes: new Date().getMonth(),
        ano: new Date().getFullYear(),
      });
    }
    setDialogLimiteAberto(true);
  };

  const handleSalvarLimite = () => {
    if (!formularioLimite.valorLimite) {
      setMensagem("Preencha o valor do limite!");
      setTipoMensagem("error");
      return;
    }

    adicionarLimiteCategoria({
      categoria: formularioLimite.categoria,
      valorLimite: parseFloat(formularioLimite.valorLimite),
      ativo: true,
      mes: formularioLimite.mes,
      ano: formularioLimite.ano,
    });

    setMensagem("Limite configurado com sucesso! 🚨");
    setTipoMensagem("success");
    setDialogLimiteAberto(false);
  };

  const testarNotificacao = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("🎉 Teste de Notificação", {
        body: "As notificações estão funcionando perfeitamente no Gengar Finanças!",
        icon: "/placeholder.svg",
      });
      setMensagem("Notificação de teste enviada!");
      setTipoMensagem("success");
    } else {
      setMensagem("Permissão para notificações não concedida!");
      setTipoMensagem("error");
    }
  };

  // Obter limites ativos do mês atual
  const mesAtual = new Date().getMonth();
  const anoAtual = new Date().getFullYear();
  const limitesAtivos = dados.limites.filter(
    (l) => l.ativo && l.mes === mesAtual && l.ano === anoAtual,
  );

  // Verificar alertas pendentes
  const despesasAtuas = obterDespesasPorCategoria();
  const alertasPendentes = limitesAtivos.filter((limite) => {
    const gastoAtual = despesasAtuas[limite.categoria] || 0;
    return gastoAtual > limite.valorLimite;
  });

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

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
                Configurações
              </Typography>
              <Typography variant="subtitle1" color="rgba(255,255,255,0.7)">
                Personalize seu aplicativo e configure alertas
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {/* Alertas Pendentes */}
          {alertasPendentes.length > 0 && (
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Alert
                  severity="warning"
                  icon={<WarningIcon />}
                  sx={{
                    backgroundColor: "rgba(255, 152, 0, 0.1)",
                    color: "#FF9800",
                    border: "1px solid rgba(255, 152, 0, 0.2)",
                    "& .MuiAlert-icon": { color: "#FF9800" },
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    🚨 Limites Ultrapassados!
                  </Typography>
                  {alertasPendentes.map((limite) => (
                    <Typography key={limite.id} variant="body2">
                      • {NOMES_CATEGORIAS_DESPESA[limite.categoria]}:{" "}
                      {formatarMoeda(despesasAtuas[limite.categoria])} de{" "}
                      {formatarMoeda(limite.valorLimite)}
                    </Typography>
                  ))}
                </Alert>
              </motion.div>
            </Grid>
          )}

          {/* Configurações de Segurança */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
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
                    <SecurityIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Segurança
                  </Typography>

                  <Box sx={{ "& > *": { mb: 2 } }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={pinAtivado}
                          onChange={(e) => setPinAtivado(e.target.checked)}
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#9654FF",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                              { backgroundColor: "#9654FF" },
                          }}
                        />
                      }
                      label="Ativar PIN de 4 dígitos"
                      sx={{ color: "white" }}
                    />

                    {pinAtivado && (
                      <>
                        <TextField
                          fullWidth
                          label="PIN (4 dígitos)"
                          type="password"
                          value={pin}
                          onChange={(e) => setPin(e.target.value)}
                          inputProps={{ maxLength: 4, pattern: "[0-9]*" }}
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
                          label="Confirmar PIN"
                          type="password"
                          value={confirmarPin}
                          onChange={(e) => setConfirmarPin(e.target.value)}
                          inputProps={{ maxLength: 4, pattern: "[0-9]*" }}
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
                      </>
                    )}

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleSalvarPin}
                      sx={{
                        background: "linear-gradient(45deg, #9654FF, #7C2AFF)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #7C2AFF, #5D0FFF)",
                        },
                      }}
                    >
                      {pinAtivado ? "Configurar PIN" : "Remover PIN"}
                    </Button>

                    {dados.configuracaoSeguranca?.pinAtivado && (
                      <Alert
                        severity="info"
                        sx={{
                          backgroundColor: "rgba(33, 150, 243, 0.1)",
                          color: "#2196F3",
                          "& .MuiAlert-icon": { color: "#2196F3" },
                        }}
                      >
                        PIN está ativo. O app solicitará o código ao iniciar.
                      </Alert>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Configurações de Notificações */}
          <Grid item xs={12} md={6}>
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
                    <NotificationsIcon
                      sx={{ mr: 1, verticalAlign: "middle" }}
                    />
                    Notificações
                  </Typography>

                  <Box sx={{ "& > *": { mb: 2 } }}>
                    <Typography
                      variant="body2"
                      color="rgba(255,255,255,0.7)"
                      gutterBottom
                    >
                      Receba alertas quando os limites de categoria forem
                      ultrapassados.
                    </Typography>

                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={testarNotificacao}
                      sx={{
                        borderColor: "rgba(150, 84, 255, 0.5)",
                        color: "#9654FF",
                        "&:hover": {
                          borderColor: "#9654FF",
                          backgroundColor: "rgba(150, 84, 255, 0.1)",
                        },
                      }}
                    >
                      Testar Notificação
                    </Button>

                    <Alert
                      severity="info"
                      sx={{
                        backgroundColor: "rgba(33, 150, 243, 0.1)",
                        color: "#2196F3",
                        "& .MuiAlert-icon": { color: "#2196F3" },
                      }}
                    >
                      Certifique-se de permitir notificações no seu navegador
                      para receber alertas.
                    </Alert>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Limites de Categoria */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
                  border: "1px solid rgba(150, 84, 255, 0.2)",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" color="white">
                      🚨 Limites por Categoria
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => abrirDialogLimite()}
                      sx={{
                        background: "linear-gradient(45deg, #9654FF, #7C2AFF)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #7C2AFF, #5D0FFF)",
                        },
                      }}
                    >
                      Novo Limite
                    </Button>
                  </Box>

                  {limitesAtivos.length === 0 ? (
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 4,
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      <Typography variant="body2">
                        Nenhum limite configurado para este mês.
                      </Typography>
                      <Typography variant="caption">
                        Configure limites para receber alertas quando
                        ultrapassados.
                      </Typography>
                    </Box>
                  ) : (
                    <List>
                      {limitesAtivos.map((limite) => {
                        const gastoAtual = despesasAtuas[limite.categoria] || 0;
                        const porcentagem =
                          (gastoAtual / limite.valorLimite) * 100;
                        const ultrapassado = gastoAtual > limite.valorLimite;

                        return (
                          <ListItem
                            key={limite.id}
                            sx={{
                              borderRadius: 2,
                              mb: 1,
                              backgroundColor: ultrapassado
                                ? "rgba(244, 67, 54, 0.1)"
                                : porcentagem > 80
                                  ? "rgba(255, 152, 0, 0.1)"
                                  : "rgba(76, 175, 80, 0.1)",
                              "&:hover": {
                                backgroundColor: ultrapassado
                                  ? "rgba(244, 67, 54, 0.2)"
                                  : porcentagem > 80
                                    ? "rgba(255, 152, 0, 0.2)"
                                    : "rgba(76, 175, 80, 0.2)",
                              },
                            }}
                          >
                            <ListItemText
                              primary={
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <span>
                                    {
                                      ICONES_CATEGORIAS_DESPESA[
                                        limite.categoria
                                      ]
                                    }
                                  </span>
                                  <Typography color="white" fontWeight="medium">
                                    {NOMES_CATEGORIAS_DESPESA[limite.categoria]}
                                  </Typography>
                                </Box>
                              }
                              secondary={
                                <Box sx={{ mt: 1 }}>
                                  <Typography
                                    variant="body2"
                                    color="rgba(255,255,255,0.7)"
                                  >
                                    {formatarMoeda(gastoAtual)} de{" "}
                                    {formatarMoeda(limite.valorLimite)} (
                                    {porcentagem.toFixed(1)}%)
                                  </Typography>
                                  <Box
                                    sx={{
                                      width: "100%",
                                      height: 4,
                                      backgroundColor: "rgba(255,255,255,0.1)",
                                      borderRadius: 2,
                                      mt: 1,
                                      overflow: "hidden",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: `${Math.min(porcentagem, 100)}%`,
                                        height: "100%",
                                        backgroundColor: ultrapassado
                                          ? "#F44336"
                                          : porcentagem > 80
                                            ? "#FF9800"
                                            : "#4CAF50",
                                        transition: "width 0.3s ease",
                                      }}
                                    />
                                  </Box>
                                </Box>
                              }
                            />
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                onClick={() => abrirDialogLimite(limite)}
                                sx={{
                                  color: "rgba(255,255,255,0.7)",
                                  "&:hover": {
                                    color: "#9654FF",
                                    backgroundColor: "rgba(150, 84, 255, 0.1)",
                                  },
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}
                    </List>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Dialog para criar/editar limite */}
        <Dialog
          open={dialogLimiteAberto}
          onClose={() => setDialogLimiteAberto(false)}
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
            {limiteEditando ? "Editar Limite" : "Novo Limite"}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1, "& > *": { mb: 2 } }}>
              <TextField
                fullWidth
                select
                label="Categoria"
                value={formularioLimite.categoria}
                onChange={(e) =>
                  setFormularioLimite({
                    ...formularioLimite,
                    categoria: e.target.value as CategoriaDespesa,
                  })
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
              >
                {Object.entries(NOMES_CATEGORIAS_DESPESA).map(([key, nome]) => (
                  <MenuItem key={key} value={key}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <span>
                        {ICONES_CATEGORIAS_DESPESA[key as CategoriaDespesa]}
                      </span>
                      {nome}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Valor Limite (R$)"
                type="number"
                inputProps={{ step: "0.01", min: "0" }}
                value={formularioLimite.valorLimite}
                onChange={(e) =>
                  setFormularioLimite({
                    ...formularioLimite,
                    valorLimite: e.target.value,
                  })
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
                select
                label="Mês"
                value={formularioLimite.mes}
                onChange={(e) =>
                  setFormularioLimite({
                    ...formularioLimite,
                    mes: Number(e.target.value),
                  })
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
              >
                {meses.map((mes, index) => (
                  <MenuItem key={index} value={index}>
                    {mes}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Ano"
                type="number"
                value={formularioLimite.ano}
                onChange={(e) =>
                  setFormularioLimite({
                    ...formularioLimite,
                    ano: Number(e.target.value),
                  })
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
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDialogLimiteAberto(false)}
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSalvarLimite}
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #9654FF, #7C2AFF)",
                "&:hover": {
                  background: "linear-gradient(45deg, #7C2AFF, #5D0FFF)",
                },
              }}
            >
              {limiteEditando ? "Atualizar" : "Criar"}
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
