export interface Despesa {
  id: string;
  valor: number;
  descricao: string;
  categoria: CategoriaDespesa;
  data: Date;
  criadoEm: Date;
  observacao?: string;
  comprovante?: string; // Base64 da imagem
}

export interface Ganho {
  id: string;
  valor: number;
  descricao: string;
  categoria: CategoriaGanho;
  data: Date;
  criadoEm: Date;
  observacao?: string;
  comprovante?: string; // Base64 da imagem
}

export interface Meta {
  id: string;
  titulo: string;
  valorAlvo: number;
  valorAtual: number;
  dataInicio: Date;
  dataFim: Date;
  ativa: boolean;
  criadoEm: Date;
}

export interface LimiteCategoria {
  id: string;
  categoria: CategoriaDespesa;
  valorLimite: number;
  ativo: boolean;
  mes: number;
  ano: number;
  criadoEm: Date;
}

export interface ConfiguracaoSeguranca {
  pinAtivado: boolean;
  pin?: string;
  perguntaSeguranca?: string;
  respostaSeguranca?: string;
}

export interface Transacao {
  id: string;
  tipo: "ganho" | "despesa";
  valor: number;
  descricao: string;
  categoria: CategoriaDespesa | CategoriaGanho;
  data: Date;
  criadoEm: Date;
  observacao?: string;
  comprovante?: string;
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
  metas: Meta[];
  limites: LimiteCategoria[];
  configuracaoSeguranca: ConfiguracaoSeguranca;
  capitalBruto: number;
  totalDespesas: number;
  capitalLiquido: number;
  saldoFinal: number;
}

export interface FiltroExtrato {
  periodo: "7dias" | "30dias" | "personalizado";
  dataInicio?: Date;
  dataFim?: Date;
  tipo?: "todos" | "ganho" | "despesa";
  categoria?: string;
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

export const NOMES_CATEGORIAS_DESPESA: Record<CategoriaDespesa, string> = {
  alimentacao: "Alimentação",
  transporte: "Transporte",
  lazer: "Lazer",
  compras: "Compras",
  contas: "Contas",
  saude: "Saúde",
  educacao: "Educação",
  outros: "Outros",
};

export const NOMES_CATEGORIAS_GANHO: Record<CategoriaGanho, string> = {
  salario: "Salário",
  extra: "Extra",
  investimentos: "Investimentos",
  vendas: "Vendas",
  freelance: "Freelance",
  outros: "Outros",
};
