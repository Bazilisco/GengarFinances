import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  TrendingUp as GanhoIcon,
  TrendingDown as DespesaIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useDadosFinanceiros } from "../../hooks/useDadosFinanceiros";
import {
  ICONES_CATEGORIAS_DESPESA,
  ICONES_CATEGORIAS_GANHO,
} from "../../types/financas";

export function TransacoesRecentes() {
  const { dados, excluirDespesa, excluirGanho } = useDadosFinanceiros();

  // Combinar todas as transações
  const todasTransacoes = [
    ...dados.despesas.map((despesa) => ({
      ...despesa,
      tipo: "despesa" as const,
    })),
    ...dados.ganhos.map((ganho) => ({
      ...ganho,
      tipo: "ganho" as const,
      categoria: ganho.categoria as any,
    })),
  ].sort(
    (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime(),
  );

  const transacoesRecentes = todasTransacoes.slice(0, 8);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Card
      sx={{
        background:
          "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
        border: "1px solid rgba(150, 84, 255, 0.2)",
      }}
    >
      <CardContent>
        <Typography variant="h6" color="white" gutterBottom>
          🕒 Transações Recentes
        </Typography>

        {transacoesRecentes.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 4,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <Typography variant="h2">👻</Typography>
            <Typography variant="body2">Nenhuma transação ainda!</Typography>
            <Typography variant="caption">
              Comece adicionando ganhos e despesas
            </Typography>
          </Box>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <List>
              {transacoesRecentes.map((transacao) => (
                <motion.div
                  key={`${transacao.tipo}-${transacao.id}`}
                  variants={itemVariants}
                >
                  <ListItem
                    component={motion.div}
                    whileHover={{ scale: 1.01, x: 4 }}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
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
                            gap: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Box color="white" fontWeight="medium">
                            {transacao.descricao}
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <span style={{ fontSize: 16 }}>
                              {transacao.tipo === "ganho"
                                ? ICONES_CATEGORIAS_GANHO[transacao.categoria]
                                : ICONES_CATEGORIAS_DESPESA[
                                    transacao.categoria
                                  ]}
                            </span>
                            <Chip
                              label={transacao.categoria}
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
                          </Box>
                        </Box>
                      }
                      secondary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 0.5,
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              fontSize: 12,
                              color: "rgba(255,255,255,0.7)",
                            }}
                          >
                            {format(new Date(transacao.data), "dd MMM yyyy", {
                              locale: ptBR,
                            })}
                          </Box>
                          <Box
                            component="span"
                            sx={{
                              fontSize: 14,
                              fontWeight: "bold",
                              color:
                                transacao.tipo === "ganho"
                                  ? "#4CAF50"
                                  : "#F44336",
                            }}
                          >
                            {transacao.tipo === "ganho" ? "+" : "-"}
                            {formatarMoeda(transacao.valor)}
                          </Box>
                        </Box>
                      }
                    />

                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          if (transacao.tipo === "despesa") {
                            excluirDespesa(transacao.id);
                          } else {
                            excluirGanho(transacao.id);
                          }
                        }}
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
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
