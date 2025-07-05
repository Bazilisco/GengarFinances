import { motion } from "framer-motion";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  useTheme,
} from "@mui/material";
import {
  AccountBalance as CapitalIcon,
  TrendingDown as DespesasIcon,
  MonetizationOn as LiquidoIcon,
  Savings as SaldoIcon,
} from "@mui/icons-material";
import { GengarMascot } from "../gengar/GengarMascot";
import { useDadosFinanceiros } from "../../hooks/useDadosFinanceiros";
import { GraficosDashboard } from "./GraficosDashboard";
import { TransacoesRecentes } from "./TransacoesRecentes";

export function VisaoGeral() {
  const { dados } = useDadosFinanceiros();
  const theme = useTheme();

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
