import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useFinanceData } from "../../hooks/useFinanceData";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "../../types/finance";
import { motion } from "framer-motion";

export function ExpenseChart() {
  const { getExpensesByCategory } = useFinanceData();
  const categoryTotals = getExpensesByCategory();

  const chartData = Object.entries(categoryTotals)
    .filter(([_, value]) => value > 0)
    .map(([category, value]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: Number(value.toFixed(2)),
      color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS],
      icon: CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS],
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">
            {data.icon} {data.name}
          </p>
          <p className="text-primary font-bold">
            ${data.value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-xl p-6 h-96"
    >
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        👻 Expenses by Category
      </h3>

      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <div className="text-4xl mb-2">🎃</div>
            <p>No expenses yet!</p>
            <p className="text-sm">Start tracking your ghostly spending</p>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry: any) => (
                <span className="text-foreground text-sm">
                  {entry.payload.icon} {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
}
