import { motion } from "framer-motion";
import { GengarMascot } from "../gengar/GengarMascot";
import { useFinanceData } from "../../hooks/useFinanceData";
import { BalanceCard } from "./BalanceCard";
import { ExpenseChart } from "./ExpenseChart";
import { MonthlyChart } from "./MonthlyChart";
import { RecentTransactions } from "./RecentTransactions";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export function Dashboard() {
  const { data } = useFinanceData();

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
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header with Gengar mascot */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <GengarMascot size="md" animate={true} />
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gengar Finance Tracker
            </h1>
            <p className="text-muted-foreground">
              Track your ghostly expenses and income
            </p>
          </div>
        </div>
      </motion.div>

      {/* Balance Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <motion.div variants={itemVariants}>
          <BalanceCard
            title="Total Balance"
            amount={data.totalBalance}
            icon={<Wallet className="w-6 h-6" />}
            type="balance"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <BalanceCard
            title="Total Income"
            amount={data.totalIncome}
            icon={<TrendingUp className="w-6 h-6" />}
            type="income"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <BalanceCard
            title="Total Expenses"
            amount={data.totalExpenses}
            icon={<TrendingDown className="w-6 h-6" />}
            type="expense"
          />
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        <motion.div variants={itemVariants}>
          <ExpenseChart />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MonthlyChart />
        </motion.div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <RecentTransactions />
      </motion.div>
    </div>
  );
}
