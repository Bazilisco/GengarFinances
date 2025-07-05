import { motion } from "framer-motion";
import { Navigation } from "../components/navigation/Navigation";
import { ExpenseForm } from "../components/finance/ExpenseForm";
import { RecentTransactions } from "../components/finance/RecentTransactions";
import { GengarMascot } from "../components/gengar/GengarMascot";

export default function Expenses() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 md:pt-24 pb-20 md:pb-8 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
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
              Add New Transaction
            </h1>
            <p className="text-muted-foreground">
              Track your ghostly income and spooky expenses
            </p>
          </motion.div>

          {/* Form and Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ExpenseForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <RecentTransactions />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
