import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BalanceCardProps {
  title: string;
  amount: number;
  icon: ReactNode;
  type: "balance" | "income" | "expense";
}

export function BalanceCard({ title, amount, icon, type }: BalanceCardProps) {
  const getCardStyles = () => {
    switch (type) {
      case "balance":
        return "bg-card border-primary/20 hover:border-primary/40";
      case "income":
        return "bg-card border-green-500/20 hover:border-green-500/40";
      case "expense":
        return "bg-card border-red-500/20 hover:border-red-500/40";
    }
  };

  const getAmountColor = () => {
    switch (type) {
      case "balance":
        return amount >= 0 ? "text-primary" : "text-red-400";
      case "income":
        return "text-green-400";
      case "expense":
        return "text-red-400";
    }
  };

  const formatAmount = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(num));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${getCardStyles()} border-2 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group relative`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-muted-foreground text-sm font-medium">{title}</div>
        <div className="text-primary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>

      <div className="space-y-1">
        <div className={`text-2xl md:text-3xl font-bold ${getAmountColor()}`}>
          {type === "balance" && amount < 0 ? "-" : ""}
          {formatAmount(amount)}
        </div>
        {type === "balance" && (
          <div className="text-xs text-muted-foreground">
            {amount >= 0
              ? "You're doing great! 👻"
              : "Spooky deficit ahead! 💀"}
          </div>
        )}
      </div>

      {/* Ghost glow effect */}
      <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
