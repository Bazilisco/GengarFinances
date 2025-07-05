import { motion } from "framer-motion";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  useTheme,
  Alert,
  Button,
  Chip,
} from "@mui/material";
import {
  AccountBalance as CapitalIcon,
  TrendingDown as DespesasIcon,
  MonetizationOn as LiquidoIcon,
  Savings as SaldoIcon,
  EmojiEvents as MetaIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { GengarMascot } from "../gengar/GengarMascot";
import { useDadosFinanceiros } from "../../hooks/useDadosFinanceiros";
import { GraficosDashboard } from "./GraficosDashboard";
import { TransacoesRecentes } from "./TransacoesRecentes";
import { NOMES_CATEGORIAS_DESPESA } from "../../types/financas";

export function VisaoGeral() {
  const { dados, obterDespesasPorCategoria, obterTop3CategoriasDespesas } =
    useDadosFinanceiros();
  const theme = useTheme();

  // Verificar alertas de limites
  const mesAtual = new Date().getMonth();
  const anoAtual = new Date().getFullYear();
  const limitesAtivos = dados.limites.filter(
    (l) => l.ativo && l.mes === mesAtual && l.ano === anoAtual,
  );
  const despesasAtuas = obterDespesasPorCategoria();
  const alertasPendentes = limitesAtivos.filter((limite) => {
    const gastoAtual = despesasAtuas[limite.categoria] || 0;
    return gastoAtual > limite.valorLimite;
  });

  // Metas ativas
  const metasAtivas = dados.metas.filter((m) => m.ativa);
  const top3Categorias = obterTop3CategoriasDespesas();

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const percentualGasto =
    dados.capitalBruto > 0
      ? (dados.totalDespesas / dados.capitalBruto) * 100
      : 0;

  const cardsFinanceiros = [
    {
      titulo: "Capital Bruto",
      valor: dados.capitalBruto,
      icone: CapitalIcon,
      cor: "#4CAF50",
      descricao: "Total de ganhos este mês",
    },
    {
      titulo: "Total Despesas",
      valor: dados.totalDespesas,
      icone: DespesasIcon,
      cor: "#F44336",
      descricao: "Total gasto este mês",
    },
    {
      titulo: "Capital Líquido",
      valor: dados.capitalLiquido,
      icone: LiquidoIcon,
      cor: dados.capitalLiquido >= 0 ? "#2196F3" : "#FF9800",
      descricao: "Bruto - Despesas",
    },
    {
      titulo: "Saldo Final",
      valor: dados.saldoFinal,
      icone: SaldoIcon,
      cor: "#9C27B0",
      descricao: "Disponível para gastar",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho com Gengar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 32 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <GengarMascot size="md" animate={true} />
          <Box>
            <Typography variant="h4" color="white" fontWeight="bold">
              Visão Geral Financeira
            </Typography>
            <Typography variant="subtitle1" color="rgba(255,255,255,0.7)">
              Acompanhe seus ganhos e gastos fantasmais
            </Typography>
          </Box>
        </Box>
      </motion.div>

      {/* Cards de resumo financeiro */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {cardsFinanceiros.map((card, index) => {
            const IconeComponente = card.icone;
            return (
              <Grid item xs={12} sm={6} md={3} key={card.titulo}>
                <motion.div variants={itemVariants}>
                  <Card
                    component={motion.div}
                    whileHover={{ scale: 1.02, y: -4 }}
                    sx={{
                      background:
                        "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
                      border: "1px solid rgba(150, 84, 255, 0.2)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 8px 32px rgba(150, 84, 255, 0.3)",
                        borderColor: "rgba(150, 84, 255, 0.4)",
                      },
                    }}
                  >
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
                          color="rgba(255,255,255,0.7)"
                          variant="body2"
                        >
                          {card.titulo}
                        </Typography>
                        <IconeComponente
                          sx={{ color: card.cor, fontSize: 28 }}
                        />
                      </Box>

                      <Typography
                        variant="h5"
                        color="white"
                        fontWeight="bold"
                        gutterBottom
                      >
                        {formatarMoeda(card.valor)}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="rgba(255,255,255,0.5)"
                      >
                        {card.descricao}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </motion.div>

      {/* Barra de progresso de gastos */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card
          sx={{
            background:
              "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
            border: "1px solid rgba(150, 84, 255, 0.2)",
            mb: 4,
          }}
        >
          <CardContent>
            <Typography variant="h6" color="white" gutterBottom>
              📊 Progresso de Gastos do Mês
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                {formatarMoeda(dados.totalDespesas)} de{" "}
                {formatarMoeda(dados.capitalBruto)}
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                {percentualGasto.toFixed(1)}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={Math.min(percentualGasto, 100)}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "rgba(255,255,255,0.1)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  background:
                    percentualGasto > 80
                      ? "linear-gradient(90deg, #FF5722, #F44336)"
                      : percentualGasto > 60
                        ? "linear-gradient(90deg, #FF9800, #FFC107)"
                        : "linear-gradient(90deg, #4CAF50, #8BC34A)",
                },
              }}
            />

            {percentualGasto > 100 && (
              <Typography
                variant="caption"
                color="#FF5722"
                sx={{ mt: 1, display: "block" }}
              >
                ⚠️ Você gastou mais do que ganhou este mês!
              </Typography>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Alertas e Metas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Alertas de Limite */}
        {alertasPendentes.length > 0 && (
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Alert
                severity="warning"
                icon={<WarningIcon />}
                action={
                  <Button
                    component={Link}
                    to="/configuracoes"
                    color="inherit"
                    size="small"
                  >
                    Configurar
                  </Button>
                }
                sx={{
                  backgroundColor: "rgba(255, 152, 0, 0.1)",
                  color: "#FF9800",
                  border: "1px solid rgba(255, 152, 0, 0.2)",
                  "& .MuiAlert-icon": { color: "#FF9800" },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  🚨 {alertasPendentes.length} limite(s) ultrapassado(s)!
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {alertasPendentes.map((limite) => (
                    <Chip
                      key={limite.id}
                      label={`${NOMES_CATEGORIAS_DESPESA[limite.categoria]}: ${formatarMoeda(despesasAtuas[limite.categoria])}`}
                      color="warning"
                      size="small"
                    />
                  ))}
                </Box>
              </Alert>
            </motion.div>
          </Grid>
        )}

        {/* Top 3 Categorias */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
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
                  🔥 Top 3 Categorias que Mais Gastam
                </Typography>
                {top3Categorias.length === 0 ? (
                  <Typography color="rgba(255,255,255,0.7)">
                    Nenhuma despesa registrada este mês.
                  </Typography>
                ) : (
                  <Box sx={{ space: 1 }}>
                    {top3Categorias.map(([categoria, valor], index) => (
                      <Box
                        key={categoria}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          py: 1,
                          borderBottom:
                            index < top3Categorias.length - 1
                              ? "1px solid rgba(150, 84, 255, 0.1)"
                              : "none",
                        }}
                      >
                        <Typography color="white">
                          {index + 1}º{" "}
                          {
                            NOMES_CATEGORIAS_DESPESA[
                              categoria as keyof typeof NOMES_CATEGORIAS_DESPESA
                            ]
                          }
                        </Typography>
                        <Typography color="#F44336" fontWeight="bold">
                          {formatarMoeda(valor)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Metas Ativas */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
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
                    🎯 Metas Ativas ({metasAtivas.length})
                  </Typography>
                  <Button
                    component={Link}
                    to="/metas"
                    size="small"
                    sx={{ color: "#9654FF" }}
                  >
                    Ver Todas
                  </Button>
                </Box>

                {metasAtivas.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 2 }}>
                    <Typography color="rgba(255,255,255,0.7)" gutterBottom>
                      Nenhuma meta ativa.
                    </Typography>
                    <Button
                      component={Link}
                      to="/metas"
                      variant="outlined"
                      size="small"
                      startIcon={<MetaIcon />}
                      sx={{
                        borderColor: "rgba(150, 84, 255, 0.5)",
                        color: "#9654FF",
                        "&:hover": {
                          borderColor: "#9654FF",
                          backgroundColor: "rgba(150, 84, 255, 0.1)",
                        },
                      }}
                    >
                      Criar Meta
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ space: 2 }}>
                    {metasAtivas.slice(0, 3).map((meta) => {
                      const progresso = Math.min(
                        (meta.valorAtual / meta.valorAlvo) * 100,
                        100,
                      );
                      return (
                        <Box key={meta.id} sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 0.5,
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="white"
                              fontWeight="medium"
                            >
                              {meta.titulo}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="rgba(255,255,255,0.7)"
                            >
                              {progresso.toFixed(0)}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={progresso}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: "rgba(255,255,255,0.1)",
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 3,
                                background:
                                  progresso >= 100
                                    ? "linear-gradient(90deg, #FFC107, #FF9800)"
                                    : "linear-gradient(90deg, #9654FF, #7C2AFF)",
                              },
                            }}
                          />
                          <Typography
                            variant="caption"
                            color="rgba(255,255,255,0.7)"
                          >
                            {formatarMoeda(meta.valorAtual)} de{" "}
                            {formatarMoeda(meta.valorAlvo)}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Gráficos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GraficosDashboard />
      </motion.div>

      {/* Transações recentes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: 32 }}
      >
        <TransacoesRecentes />
      </motion.div>
    </Box>
  );
}
