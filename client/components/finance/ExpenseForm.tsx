import { useState } from "react";
import { motion } from "framer-motion";
import { useFinanceData } from "../../hooks/useFinanceData";
import {
  ExpenseCategory,
  CATEGORY_ICONS,
  CATEGORY_COLORS,
} from "../../types/finance";
import { Calendar, DollarSign, FileText, Tag } from "lucide-react";

interface ExpenseFormProps {
  onSuccess?: () => void;
}

export function ExpenseForm({ onSuccess }: ExpenseFormProps) {
  const { addExpense, addIncome } = useFinanceData();
  const [formType, setFormType] = useState<"expense" | "income">("expense");
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "other" as ExpenseCategory,
    date: new Date().toISOString().split("T")[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories: ExpenseCategory[] = [
    "food",
    "transport",
    "entertainment",
    "shopping",
    "bills",
    "health",
    "education",
    "other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;

    setIsSubmitting(true);

    try {
      if (formType === "expense") {
        addExpense({
          amount: parseFloat(formData.amount),
          description: formData.description,
          category: formData.category,
          date: new Date(formData.date),
        });
      } else {
        addIncome({
          amount: parseFloat(formData.amount),
          description: formData.description,
          date: new Date(formData.date),
        });
      }

      // Reset form
      setFormData({
        amount: "",
        description: "",
        category: "other",
        date: new Date().toISOString().split("T")[0],
      });

      onSuccess?.();
    } catch (error) {
      console.error("Error adding transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        👻 Add Transaction
      </h2>

      {/* Type Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setFormType("expense")}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            formType === "expense"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          💸 Expense
        </button>
        <button
          type="button"
          onClick={() => setFormType("income")}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            formType === "income"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          💰 Income
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            <DollarSign className="w-4 h-4 inline mr-2" />
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            placeholder="0.00"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            <FileText className="w-4 h-4 inline mr-2" />
            Description
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            placeholder={
              formType === "expense"
                ? "What did you spend on?"
                : "Source of income"
            }
            required
          />
        </div>

        {/* Category (only for expenses) */}
        {formType === "expense" && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              <Tag className="w-4 h-4 inline mr-2" />
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFormData({ ...formData, category })}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    formData.category === category
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted/20 text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <div className="text-lg mb-1">{CATEGORY_ICONS[category]}</div>
                  <div className="text-xs capitalize">{category}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            <Calendar className="w-4 h-4 inline mr-2" />
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
              Adding...
            </div>
          ) : (
            `Add ${formType === "expense" ? "Expense" : "Income"}`
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
