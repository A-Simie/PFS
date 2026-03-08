import { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import type { Transaction } from '../../types';
import { calculateMonthlyData } from '../../utils/calculateTotals';

interface SpendingChartProps {
  transactions: Transaction[];
}

export function SpendingChart({ transactions }: SpendingChartProps) {
  const data = useMemo(() => calculateMonthlyData(transactions), [transactions]);

  if (data.length === 0) {
    return (
      <div className="h-[280px] flex items-center justify-center text-text-muted text-sm">
        No data available for chart
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1E293B',
            border: '1px solid #2d3a4f',
            borderRadius: '12px',
            color: '#f1f5f9',
            fontSize: '13px',
          }}
          formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
          labelStyle={{ color: '#94a3b8' }}
        />
        <Bar dataKey="income" fill="#0fb874" radius={[4, 4, 0, 0]} maxBarSize={20} name="Income" />
        <Bar dataKey="expenses" fill="#D4AF37" radius={[4, 4, 0, 0]} maxBarSize={20} name="Expenses" />
      </BarChart>
    </ResponsiveContainer>
  );
}
