import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, BarChart } from "@mui/x-charts";
import { useDadosFinanceiros } from "../../hooks/useDadosFinanceiros";
import {
  CORES_CATEGORIAS_DESPESA,
  ICONES_CATEGORIAS_DESPESA,
  CORES_CATEGORIAS_GANHO,
  ICONES_CATEGORIAS_GANHO,
} from "../../types/financas";

export function GraficosDashboard() {
  const {
    obterDespesasPorCategoria,
    obterGanhosPorCategoria,
    obterDadosMensais,
  } = useDadosFinanceiros();

  const categoriasDespes = obterDespesasPorCategoria();
  const categoriasGanhos = obterGanhosPorCategoria();
  const dadosMensais = obterDadosMensais();

  // Dados para gráfico de pizza das despesas
  const dadosPizzaDespesas = Object.entries(categoriasDespes)
    .filter(([_, valor]) => valor > 0)
    .map(([categoria, valor], index) => ({
      id: index,
      value: valor,
      label: `${ICONES_CATEGORIAS_DESPESA[categoria as keyof typeof ICONES_CATEGORIAS_DESPESA]} ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`,
      color:
        CORES_CATEGORIAS_DESPESA[
          categoria as keyof typeof CORES_CATEGORIAS_DESPESA
        ],
    }));

  // Dados para gráfico de pizza dos ganhos
  const dadosPizzaGanhos = Object.entries(categoriasGanhos)
    .filter(([_, valor]) => valor > 0)
    .map(([categoria, valor], index) => ({
      id: index,
      value: valor,
      label: `${ICONES_CATEGORIAS_GANHO[categoria as keyof typeof ICONES_CATEGORIAS_GANHO]} ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`,
      color:
        CORES_CATEGORIAS_GANHO[
          categoria as keyof typeof CORES_CATEGORIAS_GANHO
        ],
    }));

  // Dados para gráfico de barras mensal
  const dadosBarraMensal = dadosMensais.map((dados) => ({
    mes: dados.mes,
    Ganhos: dados.ganhos,
    Despesas: dados.despesas,
  }));

  return (
    <Grid container spacing={3}>
      {/* Gráfico de Despesas por Categoria */}
      <Grid item xs={12} lg={4}>
        <Card
          sx={{
            background:
              "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
            border: "1px solid rgba(150, 84, 255, 0.2)",
            height: 400,
          }}
        >
          <CardContent>
            <Typography variant="h6" color="white" gutterBottom>
              👻 Despesas por Categoria
            </Typography>

            {dadosPizzaDespesas.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 300,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <Typography variant="h2">🎃</Typography>
                <Typography variant="body2">Nenhuma despesa ainda!</Typography>
                <Typography variant="caption">
                  Comece a rastrear seus gastos
                </Typography>
              </Box>
            ) : (
              <Box sx={{ height: 300 }}>
                <PieChart
                  series={[
                    {
                      data: dadosPizzaDespesas,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  height={300}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Gráfico de Ganhos por Categoria */}
      <Grid item xs={12} lg={4}>
        <Card
          sx={{
            background:
              "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
            border: "1px solid rgba(150, 84, 255, 0.2)",
            height: 400,
          }}
        >
          <CardContent>
            <Typography variant="h6" color="white" gutterBottom>
              💰 Ganhos por Categoria
            </Typography>

            {dadosPizzaGanhos.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 300,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <Typography variant="h2">💸</Typography>
                <Typography variant="body2">Nenhum ganho ainda!</Typography>
                <Typography variant="caption">
                  Comece a registrar suas receitas
                </Typography>
              </Box>
            ) : (
              <Box sx={{ height: 300 }}>
                <PieChart
                  series={[
                    {
                      data: dadosPizzaGanhos,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  height={300}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Gráfico Mensal */}
      <Grid item xs={12} lg={4}>
        <Card
          sx={{
            background:
              "linear-gradient(135deg, rgba(150, 84, 255, 0.1), rgba(150, 84, 255, 0.05))",
            border: "1px solid rgba(150, 84, 255, 0.2)",
            height: 400,
          }}
        >
          <CardContent>
            <Typography variant="h6" color="white" gutterBottom>
              📊 Evolução Mensal
            </Typography>

            <Box sx={{ height: 300 }}>
              <BarChart
                dataset={dadosBarraMensal}
                xAxis={[
                  {
                    scaleType: "band",
                    dataKey: "mes",
                  },
                ]}
                yAxis={[
                  {
                    valueFormatter: (value) =>
                      new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        notation: "compact",
                      }).format(value),
                  },
                ]}
                series={[
                  {
                    dataKey: "Ganhos",
                    label: "Ganhos",
                    color: "#4CAF50",
                  },
                  {
                    dataKey: "Despesas",
                    label: "Despesas",
                    color: "#F44336",
                  },
                ]}
                height={300}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
