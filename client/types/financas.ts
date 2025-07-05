export interface Despesa {
  id: string;
  valor: number;
  descricao: string;
  categoria: CategoriaDespesa;
  data: Date;
  criadoEm: Date;
}

export interface Ganho {
  id: string;
  valor: number;
  descricao: string;
  categoria: CategoriaGanho;
  data: Date;
  criadoEm: Date;
}

export type CategoriaDespesa =
  | "alimentacao"
  | "transporte"
  | "lazer"
  | "compras"
  | "contas"
  | "saude"
  | "educacao"
  | "outros";

export type CategoriaGanho =
  | "salario"
  | "extra"
  | "investimentos"
  | "vendas"
  | "freelance"
  | "outros";

export interface DadosFinanceiros {
  despesas: Despesa[];
  ganhos: Ganho[];
  capitalBruto: number; // Total de ganhos do mês
  totalDespesas: number; // Total de gastos do mês
  capitalLiquido: number; // Bruto - Despesas
  saldoFinal: number; // O que sobrou para gastar livremente
}

export interface DadosGrafico {
  nome: string;
  valor: number;
  cor: string;
}

export const ICONES_CATEGORIAS_DESPESA: Record<CategoriaDespesa, string> = {
  alimentacao: "🍽️",
  transporte: "👻",
  lazer: "🎮",
  compras: "🛒",
  contas: "⚡",
  saude: "💊",
  educacao: "📚",
  outros: "👻",
};

export const ICONES_CATEGORIAS_GANHO: Record<CategoriaGanho, string> = {
  salario: "💰",
  extra: "💸",
  investimentos: "📈",
  vendas: "🏪",
  freelance: "💻",
  outros: "👻",
};

export const CORES_CATEGORIAS_DESPESA: Record<CategoriaDespesa, string> = {
  alimentacao: "#FF6B6B",
  transporte: "#9654FF",
  lazer: "#4ECDC4",
  compras: "#45B7D1",
  contas: "#FFA726",
  saude: "#EF5350",
  educacao: "#66BB6A",
  outros: "#AB47BC",
};

export const CORES_CATEGORIAS_GANHO: Record<CategoriaGanho, string> = {
  salario: "#4CAF50",
  extra: "#8BC34A",
  investimentos: "#2196F3",
  vendas: "#FF9800",
  freelance: "#9C27B0",
  outros: "#607D8B",
};
