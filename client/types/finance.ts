export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: Date;
  createdAt: Date;
}

export type ExpenseCategory =
  | "food"
  | "transport"
  | "entertainment"
  | "shopping"
  | "bills"
  | "health"
  | "education"
  | "other";

export interface Income {
  id: string;
  amount: number;
  description: string;
  date: Date;
  createdAt: Date;
}

export interface FinanceData {
  expenses: Expense[];
  income: Income[];
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}

export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  food: "🍽️",
  transport: "👻",
  entertainment: "🎮",
  shopping: "🛒",
  bills: "⚡",
  health: "💊",
  education: "📚",
  other: "👻",
};

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  food: "#FF6B6B",
  transport: "#9654FF",
  entertainment: "#4ECDC4",
  shopping: "#45B7D1",
  bills: "#FFA726",
  health: "#EF5350",
  education: "#66BB6A",
  other: "#AB47BC",
};
