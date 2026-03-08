import type { Transaction } from '../types';

export function calculateTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function calculateTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function calculateNetBalance(transactions: Transaction[]): number {
  return calculateTotalIncome(transactions) - calculateTotalExpenses(transactions);
}

export function calculateSavingsRate(transactions: Transaction[]): number {
  const income = calculateTotalIncome(transactions);
  if (income === 0) return 0;
  const net = calculateNetBalance(transactions);
  return (net / income) * 100;
}

export function calculateSpendingByCategory(
  transactions: Transaction[]
): Record<string, number> {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export function calculateMonthlyData(transactions: Transaction[]): MonthlyData[] {
  const monthlyMap = new Map<string, { income: number; expenses: number }>();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`;
    const existing = monthlyMap.get(key) || { income: 0, expenses: 0 };

    if (t.type === 'income') {
      existing.income += t.amount;
    } else {
      existing.expenses += t.amount;
    }
    monthlyMap.set(key, existing);
  });

  return Array.from(monthlyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-7)
    .map(([key, data]) => ({
      month: monthNames[parseInt(key.split('-')[1])],
      income: data.income,
      expenses: data.expenses,
    }));
}
