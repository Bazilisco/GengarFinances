import { motion } from "framer-motion";
import { useFinanceData } from "../../hooks/useFinanceData";
import { CATEGORY_ICONS } from "../../types/finance";
import { format } from "date-fns";
import { Trash2, Plus, Minus } from "lucide-react";

export function RecentTransactions() {
  const { data, deleteExpense, deleteIncome } = useFinanceData();

  // Combine and sort all transactions
  const allTransactions = [
    ...data.expenses.map((expense) => ({
      ...expense,
      type: "expense" as const,
    })),
    ...data.income.map((income) => ({
      ...income,
      type: "income" as const,
      category: "income" as const,
    })),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const recentTransactions = allTransactions.slice(0, 10);

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
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        🕒 Recent Transactions
      </h3>

      {recentTransactions.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <div className="text-4xl mb-2">👻</div>
          <p>No transactions yet!</p>
          <p className="text-sm">Start adding income and expenses</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {recentTransactions.map((transaction) => (
            <motion.div
              key={`${transaction.type}-${transaction.id}`}
              variants={itemVariants}
              whileHover={{ scale: 1.01, x: 4 }}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  {transaction.type === "income" ? (
                    <Plus className="w-5 h-5 text-green-400" />
                  ) : (
                    <>
                      <Minus className="w-5 h-5 text-red-400" />
                      <span className="text-sm ml-1">
                        {CATEGORY_ICONS[transaction.category]}
                      </span>
                    </>
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(transaction.date), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`font-bold text-lg ${
                    transaction.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </span>

                <button
                  onClick={() => {
                    if (transaction.type === "expense") {
                      deleteExpense(transaction.id);
                    } else {
                      deleteIncome(transaction.id);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-destructive/10 rounded-lg text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
