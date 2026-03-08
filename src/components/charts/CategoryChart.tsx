import { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { Transaction } from '../../types';
import { calculateSpendingByCategory } from '../../utils/calculateTotals';
import { formatCurrency } from '../../utils/formatCurrency';
import { CATEGORY_COLORS } from '../../constants/categories';

interface CategoryChartProps {
  transactions: Transaction[];
}

const FALLBACK_COLORS = ['#0fb874', '#D4AF37', '#3b82f6', '#f97316', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

export function CategoryChart({ transactions }: CategoryChartProps) {
  const chartData = useMemo(() => {
    const byCategory = calculateSpendingByCategory(transactions);
    return Object.entries(byCategory)
      .map(([name, value]) => ({
        name,
        value,
        color: CATEGORY_COLORS[name] || FALLBACK_COLORS[Object.keys(byCategory).indexOf(name) % FALLBACK_COLORS.length],
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const totalSpent = useMemo(
    () => chartData.reduce((sum, d) => sum + d.value, 0),
    [chartData]
  );

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-text-muted text-sm">
        No spending data available
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                border: '1px solid #2d3a4f',
                borderRadius: '12px',
                color: '#f1f5f9',
                fontSize: '13px',
              }}
              formatter={(value) => [formatCurrency(Number(value)), '']}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-xs text-text-muted uppercase tracking-wider">Total Spent</p>
            <p className="text-2xl font-bold text-text-primary">{formatCurrency(totalSpent)}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-text-secondary truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
