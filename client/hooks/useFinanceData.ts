import { useState, useEffect } from "react";
import {
  Expense,
  Income,
  FinanceData,
  ExpenseCategory,
} from "../types/finance";

const STORAGE_KEY = "gengar-finance-data";

// Mock initial data
const initialExpenses: Expense[] = [
  {
    id: "1",
    amount: 25.5,
    description: "Ghost pepper lunch",
    category: "food",
    date: new Date("2024-01-15"),
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    amount: 15.0,
    description: "Haunted house transport",
    category: "transport",
    date: new Date("2024-01-14"),
    createdAt: new Date("2024-01-14"),
  },
  {
    id: "3",
    amount: 60.0,
    description: "Spooky game night",
    category: "entertainment",
    date: new Date("2024-01-13"),
    createdAt: new Date("2024-01-13"),
  },
];

const initialIncome: Income[] = [
  {
    id: "1",
    amount: 2500.0,
    description: "Salary - Ghost Hunter Inc.",
    date: new Date("2024-01-01"),
    createdAt: new Date("2024-01-01"),
  },
];

export function useFinanceData() {
  const [data, setData] = useState<FinanceData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      parsed.expenses = parsed.expenses.map((e: any) => ({
        ...e,
        date: new Date(e.date),
        createdAt: new Date(e.createdAt),
      }));
      parsed.income = parsed.income.map((i: any) => ({
        ...i,
        date: new Date(i.date),
        createdAt: new Date(i.createdAt),
      }));
      return parsed;
    }

    return {
      expenses: initialExpenses,
      income: initialIncome,
      totalBalance: 0,
      totalIncome: 0,
      totalExpenses: 0,
    };
  });

  // Calculate totals whenever data changes
  useEffect(() => {
    const totalIncome = data.income.reduce(
      (sum, income) => sum + income.amount,
      0,
    );
    const totalExpenses = data.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
    const totalBalance = totalIncome - totalExpenses;

    setData((prev) => ({
      ...prev,
      totalBalance,
      totalIncome,
      totalExpenses,
    }));
  }, [data.expenses, data.income]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addExpense = (expense: Omit<Expense, "id" | "createdAt">) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setData((prev) => ({
      ...prev,
      expenses: [newExpense, ...prev.expenses],
    }));
  };

  const addIncome = (income: Omit<Income, "id" | "createdAt">) => {
    const newIncome: Income = {
      ...income,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setData((prev) => ({
      ...prev,
      income: [newIncome, ...prev.income],
    }));
  };

  const deleteExpense = (id: string) => {
    setData((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((e) => e.id !== id),
    }));
  };

  const deleteIncome = (id: string) => {
    setData((prev) => ({
      ...prev,
      income: prev.income.filter((i) => i.id !== id),
    }));
  };

  const getExpensesByCategory = () => {
    const categoryTotals: Record<ExpenseCategory, number> = {
      food: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
      bills: 0,
      health: 0,
      education: 0,
      other: 0,
    };

    data.expenses.forEach((expense) => {
      categoryTotals[expense.category] += expense.amount;
    });

    return categoryTotals;
  };

  const getMonthlyData = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentYear = new Date().getFullYear();

    return months.map((month) => {
      const monthIndex = months.indexOf(month);
      const monthExpenses = data.expenses
        .filter(
          (e) =>
            e.date.getMonth() === monthIndex &&
            e.date.getFullYear() === currentYear,
        )
        .reduce((sum, e) => sum + e.amount, 0);

      const monthIncome = data.income
        .filter(
          (i) =>
            i.date.getMonth() === monthIndex &&
            i.date.getFullYear() === currentYear,
        )
        .reduce((sum, i) => sum + i.amount, 0);

      return {
        month,
        expenses: monthExpenses,
        income: monthIncome,
      };
    });
  };

  return {
    data,
    addExpense,
    addIncome,
    deleteExpense,
    deleteIncome,
    getExpensesByCategory,
    getMonthlyData,
  };
}
