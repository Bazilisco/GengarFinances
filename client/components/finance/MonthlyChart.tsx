import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFinanceData } from "../../hooks/useFinanceData";
import { motion } from "framer-motion";

export function MonthlyChart() {
  const { getMonthlyData } = useFinanceData();
  const monthlyData = getMonthlyData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === "income" ? "💰" : "💸"} {entry.dataKey}: $
              {entry.value.toLocaleString()}
            </p>
          ))}
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
        📊 Monthly Overview
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="income"
            fill="#10B981"
            radius={[4, 4, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
          <Bar
            dataKey="expenses"
            fill="#EF4444"
            radius={[4, 4, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
