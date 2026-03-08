export const EXPENSE_CATEGORIES = [
  'Housing',
  'Food',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Software',
  'Groceries',
  'Technology',
  'Healthcare',
  'Education',
] as const;

export const INCOME_CATEGORIES = [
  'Income',
  'Salary',
  'Freelance',
  'Investment',
  'Bonus',
] as const;

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES] as const;

export type CategoryName = (typeof ALL_CATEGORIES)[number];

export const CATEGORY_ICONS: Record<string, string> = {
  Housing: 'home',
  Food: 'utensils',
  Transportation: 'car',
  Entertainment: 'film',
  Utilities: 'zap',
  Software: 'monitor',
  Groceries: 'shopping-cart',
  Technology: 'smartphone',
  Healthcare: 'heart',
  Education: 'book-open',
  Income: 'dollar-sign',
  Salary: 'briefcase',
  Freelance: 'pen-tool',
  Investment: 'trending-up',
  Bonus: 'gift',
};

export const CATEGORY_COLORS: Record<string, string> = {
  Housing: '#0fb874',
  Food: '#D4AF37',
  Transportation: '#3b82f6',
  Entertainment: '#f97316',
  Utilities: '#ef4444',
  Software: '#8b5cf6',
  Groceries: '#06b6d4',
  Technology: '#6366f1',
  Healthcare: '#ec4899',
  Education: '#14b8a6',
  Income: '#0fb874',
  Salary: '#0fb874',
  Freelance: '#22d3ee',
  Investment: '#a78bfa',
  Bonus: '#f59e0b',
};
