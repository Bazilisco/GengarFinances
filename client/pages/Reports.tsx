import { motion } from "framer-motion";
import { Navigation } from "../components/navigation/Navigation";
import { ExpenseChart } from "../components/finance/ExpenseChart";
import { MonthlyChart } from "../components/finance/MonthlyChart";
import { GengarMascot } from "../components/gengar/GengarMascot";
import { useFinanceData } from "../hooks/useFinanceData";

export default function Reports() {
  const { data, getExpensesByCategory } = useFinanceData();
  const categoryTotals = getExpensesByCategory();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 md:pt-24 pb-20 md:pb-8 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <GengarMascot size="md" animate={true} />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Financial Reports
            </h1>
            <p className="text-muted-foreground">
              Analyze your ghostly spending patterns
            </p>
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ExpenseChart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <MonthlyChart />
            </motion.div>
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">
              📊 Summary Statistics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">
                  ${data.totalBalance.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Net Balance</div>
              </div>

              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-green-400 mb-2">
                  ${data.totalIncome.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Income
                </div>
              </div>

              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-red-400 mb-2">
                  ${data.totalExpenses.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Expenses
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Expense Breakdown by Category
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(categoryTotals)
                  .filter(([_, value]) => value > 0)
                  .map(([category, amount]) => (
                    <div
                      key={category}
                      className="p-3 bg-muted/10 rounded-lg text-center"
                    >
                      <div className="text-lg mb-1">
                        {category === "food" && "🍽️"}
                        {category === "transport" && "👻"}
                        {category === "entertainment" && "🎮"}
                        {category === "shopping" && "🛒"}
                        {category === "bills" && "⚡"}
                        {category === "health" && "💊"}
                        {category === "education" && "📚"}
                        {category === "other" && "👻"}
                      </div>
                      <div className="text-sm font-medium text-foreground capitalize">
                        {category}
                      </div>
                      <div className="text-sm text-primary font-bold">
                        ${amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
