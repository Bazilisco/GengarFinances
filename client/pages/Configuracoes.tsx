import { useState, useRef } from "react";
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
  MenuItem,
  Fab,
  Chip,
  Paper,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Palette as ThemeIcon,
  Language as LanguageIcon,
  Download as ExportIcon,
  Upload as ImportIcon,
  Save as SaveIcon,
  Check as CheckIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  FolderOpen as FolderOpenIcon,
  CloudDownload as CloudDownloadIcon,
} from "@mui/icons-material";
import { GengarMascot } from "../components/gengar/GengarMascot";
import { NavegacaoPrincipal } from "../components/navegacao/NavegacaoPrincipal";
import { CampoMoeda } from "../components/forms/CampoMoeda";
import { useDadosFinanceiros } from "../hooks/useDadosFinanceiros";

interface ConfiguracoesApp {
  diaInicioMes: number;
  moeda: "BRL" | "USD" | "EUR";
  tema: "claro" | "escuro";
  idioma: "pt-BR" | "en-US" | "es-ES";
}

export default function Configuracoes() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { exportarDados, importarDados } = useDadosFinanceiros();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesApp>({
    diaInicioMes: 1,
    moeda: "BRL",
    tema: "escuro",
    idioma: "pt-BR",
  });

  const [valorTeste, setValorTeste] = useState(0); // Valor em centavos
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [modalSucessoAberto, setModalSucessoAberto] = useState(false);

  const moedas = [
    { value: "BRL", label: "Real Brasileiro (R$)", flag: "🇧🇷" },
    { value: "USD", label: "Dólar Americano ($)", flag: "🇺🇸" },
    { value: "EUR", label: "Euro (€)", flag: "🇪🇺" },
  ];

  const idiomas = [
    { value: "pt-BR", label: "Português (Brasil)", flag: "🇧🇷" },
    { value: "en-US", label: "English (US)", flag: "🇺🇸" },
    { value: "es-ES", label: "Español (España)", flag: "🇪🇸" },
  ];

  const diasMes = Array.from({ length: 28 }, (_, i) => i + 1);

  const handleSalvarConfiguracoes = async () => {
    setCarregando(true);

    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSucesso(true);
      setMensagem("Configurações salvas com sucesso! 👻");

      // Reset sucesso após 2 segundos
      setTimeout(() => setSucesso(false), 2000);
    } catch (error) {
      setMensagem("Erro ao salvar configurações 😢");
    } finally {
      setCarregando(false);
    }
  };

  const handleExportar = () => {
    exportarDados();
    setMensagem("Dados exportados com sucesso! 📤");
  };

  const handleImportar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;

    try {
      await importarDados(arquivo);
      // Mostrar modal de sucesso ao invés de snackbar
      setModalSucessoAberto(true);
    } catch (error) {
      setMensagem("Erro ao importar dados 😢");
    }

    // Limpar input
    event.target.value = "";
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0a0a0a", pb: 10 }}>
      <NavegacaoPrincipal />

      <Box sx={{ p: { xs: 2, md: 3 } }}>
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
              gap: 2,
              mb: 4,
              flexDirection: { xs: "column", sm: "row" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <GengarMascot size="md" animate={true} />
            <Box>
              <Typography variant="h4" color="white" fontWeight="bold">
                ⚙️ Configurações
              </Typography>
              <Typography variant="subtitle1" color="rgba(255,255,255,0.7)">
                Personalize sua experiência fantasmal
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {/* Período de Análise */}
          <Grid item xs={12} md={6}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(150, 84, 255, 0.15), rgba(150, 84, 255, 0.05))",
                  border: "1px solid rgba(150, 84, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(150, 84, 255, 0.2)",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <CalendarIcon sx={{ color: "#9654FF" }} />
                    <Typography variant="h6" color="white" fontWeight="bold">
                      Período de Análise
                    </Typography>
                  </Box>

                  <TextField
                    fullWidth
                    select
                    label="Dia de início do mês"
                    value={configuracoes.diaInicioMes}
                    onChange={(e) =>
                      setConfiguracoes({
                        ...configuracoes,
                        diaInicioMes: Number(e.target.value),
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
                        "&.Mui-focused fieldset": { borderColor: "#9654FF" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                    }}
                  >
                    {diasMes.map((dia) => (
                      <MenuItem key={dia} value={dia}>
                        Dia {dia}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Box sx={{ mt: 2 }}>
                    <Alert
                      severity="info"
                      icon={<InfoIcon />}
                      sx={{
                        backgroundColor: "rgba(33, 150, 243, 0.1)",
                        color: "#64B5F6",
                        border: "1px solid rgba(33, 150, 243, 0.2)",
                        "& .MuiAlert-icon": { color: "#64B5F6" },
                      }}
                    >
                      O período mensal será calculado a partir do dia
                      selecionado
                    </Alert>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Configurações de Moeda */}
          <Grid item xs={12} md={6}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(150, 84, 255, 0.15), rgba(150, 84, 255, 0.05))",
                  border: "1px solid rgba(150, 84, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(150, 84, 255, 0.2)",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <MoneyIcon sx={{ color: "#9654FF" }} />
                    <Typography variant="h6" color="white" fontWeight="bold">
                      Moeda Principal
                    </Typography>
                  </Box>

                  <TextField
                    fullWidth
                    select
                    label="Selecionar moeda"
                    value={configuracoes.moeda}
                    onChange={(e) =>
                      setConfiguracoes({
                        ...configuracoes,
                        moeda: e.target.value as "BRL" | "USD" | "EUR",
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
                        "&.Mui-focused fieldset": { borderColor: "#9654FF" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                    }}
                  >
                    {moedas.map((moeda) => (
                      <MenuItem key={moeda.value} value={moeda.value}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <span>{moeda.flag}</span>
                          {moeda.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>

                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="body2"
                      color="rgba(255,255,255,0.7)"
                      gutterBottom
                    >
                      Teste o formatador de moeda:
                    </Typography>
                    <CampoMoeda
                      fullWidth
                      label="Digite apenas números"
                      value={valorTeste}
                      onChange={setValorTeste}
                      moeda={configuracoes.moeda}
                      helperText={`Valor armazenado: ${valorTeste} centavos`}
                    />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Tema e Aparência */}
          <Grid item xs={12} md={6}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(150, 84, 255, 0.15), rgba(150, 84, 255, 0.05))",
                  border: "1px solid rgba(150, 84, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(150, 84, 255, 0.2)",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <ThemeIcon sx={{ color: "#9654FF" }} />
                    <Typography variant="h6" color="white" fontWeight="bold">
                      Tema e Aparência
                    </Typography>
                  </Box>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={configuracoes.tema === "escuro"}
                        onChange={(e) =>
                          setConfiguracoes({
                            ...configuracoes,
                            tema: e.target.checked ? "escuro" : "claro",
                          })
                        }
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#9654FF",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "#9654FF",
                            },
                        }}
                      />
                    }
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <span>
                          {configuracoes.tema === "escuro" ? "🌙" : "☀️"}
                        </span>
                        <Typography color="white">
                          {configuracoes.tema === "escuro"
                            ? "Modo Escuro"
                            : "Modo Claro"}
                        </Typography>
                      </Box>
                    }
                    sx={{ width: "100%" }}
                  />

                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="body2"
                      color="rgba(255,255,255,0.7)"
                      gutterBottom
                    >
                      Prévia das cores:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {[
                        "#9654FF",
                        "#7C2AFF",
                        "#5D0FFF",
                        "#F44336",
                        "#4CAF50",
                      ].map((cor) => (
                        <Chip
                          key={cor}
                          label={cor}
                          sx={{
                            backgroundColor: `${cor}20`,
                            color: cor,
                            border: `1px solid ${cor}40`,
                            fontSize: "0.75rem",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Idioma */}
          <Grid item xs={12} md={6}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(150, 84, 255, 0.15), rgba(150, 84, 255, 0.05))",
                  border: "1px solid rgba(150, 84, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(150, 84, 255, 0.2)",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <LanguageIcon sx={{ color: "#9654FF" }} />
                    <Typography variant="h6" color="white" fontWeight="bold">
                      Idioma
                    </Typography>
                  </Box>

                  <TextField
                    fullWidth
                    select
                    label="Idioma da interface"
                    value={configuracoes.idioma}
                    onChange={(e) =>
                      setConfiguracoes({
                        ...configuracoes,
                        idioma: e.target.value as "pt-BR" | "en-US" | "es-ES",
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
                        "&.Mui-focused fieldset": { borderColor: "#9654FF" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                    }}
                  >
                    {idiomas.map((idioma) => (
                      <MenuItem key={idioma.value} value={idioma.value}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <span>{idioma.flag}</span>
                          {idioma.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>

                  <Box sx={{ mt: 2 }}>
                    <Alert
                      severity="warning"
                      sx={{
                        backgroundColor: "rgba(255, 152, 0, 0.1)",
                        color: "#FFB74D",
                        border: "1px solid rgba(255, 152, 0, 0.2)",
                        "& .MuiAlert-icon": { color: "#FFB74D" },
                      }}
                    >
                      Requer reinicialização para aplicar
                    </Alert>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Exportar Dados */}
          <Grid item xs={12} md={6}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(150, 84, 255, 0.15), rgba(150, 84, 255, 0.05))",
                  border: "1px solid rgba(150, 84, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(150, 84, 255, 0.2)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #9654FF, #7C2AFF)",
                        boxShadow: "0 8px 25px rgba(150, 84, 255, 0.3)",
                      }}
                    >
                      <CloudDownloadIcon
                        sx={{ color: "white", fontSize: 28 }}
                      />
                    </Box>
                    <Typography
                      variant="h5"
                      color="white"
                      fontWeight="bold"
                      sx={{ fontSize: { xs: "1.3rem", md: "1.5rem" } }}
                    >
                      Exportar meus dados
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    color="rgba(255,255,255,0.7)"
                    sx={{ mb: 4, flexGrow: 1, lineHeight: 1.6 }}
                  >
                    Você poderá restaurar seus ganhos, despesas e metas quando
                    quiser.
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleExportar} // Handler será adicionado manualmente depois
                    sx={{
                      background: "linear-gradient(45deg, #9654FF, #7C2AFF)",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      py: 2,
                      borderRadius: 3,
                      textTransform: "none",
                      boxShadow: "0 8px 25px rgba(150, 84, 255, 0.4)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #7C2AFF, #5D0FFF)",
                        boxShadow: "0 12px 35px rgba(150, 84, 255, 0.6)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Salvar backup no meu dispositivo
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Importar Backup */}
          <Grid item xs={12} md={6}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(150, 84, 255, 0.15), rgba(150, 84, 255, 0.05))",
                  border: "1px solid rgba(150, 84, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(150, 84, 255, 0.2)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #B39DDB, #9575CD)",
                        boxShadow: "0 8px 25px rgba(179, 157, 219, 0.3)",
                      }}
                    >
                      <FolderOpenIcon sx={{ color: "white", fontSize: 28 }} />
                    </Box>
                    <Typography
                      variant="h5"
                      color="white"
                      fontWeight="bold"
                      sx={{ fontSize: { xs: "1.3rem", md: "1.5rem" } }}
                    >
                      Importar backup
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    color="rgba(255,255,255,0.7)"
                    sx={{ mb: 4, flexGrow: 1, lineHeight: 1.6 }}
                  >
                    Carregue um arquivo de backup para restaurar seus dados
                    salvos.
                  </Typography>

                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportar} // onChange será customizado manualmente depois se necessário
                    style={{ display: "none" }}
                    ref={inputFileRef}
                  />
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    onClick={() => inputFileRef.current?.click()} // onClick será adicionado manualmente depois
                    sx={{
                      borderColor: "rgba(179, 157, 219, 0.6)",
                      color: "#B39DDB",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      py: 2,
                      borderRadius: 3,
                      textTransform: "none",
                      borderWidth: 2,
                      "&:hover": {
                        borderColor: "#B39DDB",
                        backgroundColor: "rgba(179, 157, 219, 0.1)",
                        color: "#D1C4E9",
                        borderWidth: 2,
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(179, 157, 219, 0.3)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Selecionar arquivo do meu computador
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Informação de Segurança */}
          <Grid item xs={12}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  py: 3,
                  px: 2,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, rgba(150, 84, 255, 0.08), rgba(150, 84, 255, 0.03))",
                  border: "1px solid rgba(150, 84, 255, 0.1)",
                }}
              >
                <Typography
                  variant="body2"
                  color="rgba(255,255,255,0.6)"
                  sx={{ mb: 1 }}
                >
                  🔒 Seus dados são armazenados localmente e criptografados
                </Typography>
                <Typography variant="caption" color="rgba(255,255,255,0.4)">
                  Os backups contêm apenas seus dados financeiros pessoais
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Modal de Sucesso */}
        <Dialog
          open={modalSucessoAberto}
          onClose={() => setModalSucessoAberto(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              background:
                "linear-gradient(135deg, rgba(150, 84, 255, 0.15), rgba(150, 84, 255, 0.05))",
              border: "1px solid rgba(150, 84, 255, 0.3)",
              borderRadius: 4,
              backdropFilter: "blur(20px)",
            },
          }}
        >
          <DialogContent sx={{ textAlign: "center", py: 6 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4CAF50, #388E3C)",
                  margin: "0 auto 24px auto",
                  boxShadow: "0 8px 25px rgba(76, 175, 80, 0.4)",
                }}
              >
                <CheckIcon sx={{ color: "white", fontSize: 40 }} />
              </Box>
            </motion.div>

            <Typography
              variant="h4"
              color="white"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" } }}
            >
              Backup carregado com sucesso!
            </Typography>

            <Typography
              variant="body1"
              color="rgba(255,255,255,0.7)"
              sx={{ mb: 4, lineHeight: 1.6 }}
            >
              Todos os seus dados foram restaurados e já estão disponíveis no
              aplicativo.
            </Typography>

            <Box
              sx={{ display: "flex", gap: 1, justifyContent: "center", mb: 2 }}
            >
              <Chip
                label="✅ Ganhos"
                sx={{
                  backgroundColor: "rgba(76, 175, 80, 0.2)",
                  color: "#81C784",
                  border: "1px solid rgba(76, 175, 80, 0.3)",
                }}
              />
              <Chip
                label="✅ Despesas"
                sx={{
                  backgroundColor: "rgba(76, 175, 80, 0.2)",
                  color: "#81C784",
                  border: "1px solid rgba(76, 175, 80, 0.3)",
                }}
              />
              <Chip
                label="✅ Metas"
                sx={{
                  backgroundColor: "rgba(76, 175, 80, 0.2)",
                  color: "#81C784",
                  border: "1px solid rgba(76, 175, 80, 0.3)",
                }}
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ justifyContent: "center", pb: 4 }}>
            <Button
              onClick={() => setModalSucessoAberto(false)}
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(45deg, #9654FF, #7C2AFF)",
                color: "white",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(45deg, #7C2AFF, #5D0FFF)",
                },
              }}
            >
              Continuar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Botão Salvar Fixo */}
        <Fab
          color="primary"
          aria-label="salvar"
          onClick={handleSalvarConfiguracoes}
          disabled={carregando}
          sx={{
            position: "fixed",
            bottom: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
            background: sucesso
              ? "linear-gradient(45deg, #4CAF50, #388E3C)"
              : "linear-gradient(45deg, #9654FF, #7C2AFF)",
            "&:hover": {
              background: sucesso
                ? "linear-gradient(45deg, #388E3C, #2E7D32)"
                : "linear-gradient(45deg, #7C2AFF, #5D0FFF)",
            },
            boxShadow: "0 8px 25px rgba(150, 84, 255, 0.4)",
            transition: "all 0.3s ease",
            ...(carregando && {
              animation: "pulse 1.5s infinite",
            }),
          }}
        >
          {carregando ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshIcon />
            </motion.div>
          ) : sucesso ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <CheckIcon />
            </motion.div>
          ) : (
            <SaveIcon />
          )}
        </Fab>

        {/* Snackbar para mensagens */}
        <Snackbar
          open={!!mensagem}
          autoHideDuration={4000}
          onClose={() => setMensagem("")}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setMensagem("")}
            severity="success"
            sx={{
              width: "100%",
              backgroundColor: "rgba(76, 175, 80, 0.1)",
              color: "#81C784",
              border: "1px solid rgba(76, 175, 80, 0.2)",
              "& .MuiAlert-icon": { color: "#81C784" },
            }}
          >
            {mensagem}
          </Alert>
        </Snackbar>
      </Box>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}
      </style>
    </Box>
  );
}
