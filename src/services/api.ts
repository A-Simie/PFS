import type { Transaction, Budget } from '../types';
import { getStorageItem, setStorageItem, hasStorageItem } from './storage';
import dbData from '../data/db.json';

function loadTransactions(): Transaction[] {
  if (hasStorageItem('transactions')) {
    return getStorageItem<Transaction[]>('transactions') || [];
  }
  const seed = dbData.transactions as Transaction[];
  setStorageItem('transactions', seed);
  return seed;
}

function loadBudgets(): Budget[] {
  if (hasStorageItem('budgets')) {
    return getStorageItem<Budget[]>('budgets') || [];
  }
  const seed = dbData.budgets as Budget[];
  setStorageItem('budgets', seed);
  return seed;
}

export const api = {
  getTransactions: (): Transaction[] => loadTransactions(),

  addTransaction: (transaction: Transaction): Transaction[] => {
    const txns = loadTransactions();
    txns.unshift(transaction);
    setStorageItem('transactions', txns);
    return txns;
  },

  updateTransaction: (id: string, updates: Partial<Transaction>): Transaction[] => {
    const txns = loadTransactions().map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    setStorageItem('transactions', txns);
    return txns;
  },

  deleteTransaction: (id: string): Transaction[] => {
    const txns = loadTransactions().filter((t) => t.id !== id);
    setStorageItem('transactions', txns);
    return txns;
  },

  getBudgets: (): Budget[] => loadBudgets(),

  addBudget: (budget: Budget): Budget[] => {
    const budgets = loadBudgets();
    budgets.push(budget);
    setStorageItem('budgets', budgets);
    return budgets;
  },

  updateBudget: (id: string, updates: Partial<Budget>): Budget[] => {
    const budgets = loadBudgets().map((b) =>
      b.id === id ? { ...b, ...updates } : b
    );
    setStorageItem('budgets', budgets);
    return budgets;
  },

  deleteBudget: (id: string): Budget[] => {
    const budgets = loadBudgets().filter((b) => b.id !== id);
    setStorageItem('budgets', budgets);
    return budgets;
  },

  recalculateBudgetSpending: (transactions: Transaction[], budgets: Budget[]): Budget[] => {
    const spendByCategory: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        spendByCategory[t.category] = (spendByCategory[t.category] || 0) + t.amount;
      });

    const updated = budgets.map((b) => ({
      ...b,
      spent: spendByCategory[b.category] || 0,
    }));
    setStorageItem('budgets', updated);
    return updated;
  },
};
