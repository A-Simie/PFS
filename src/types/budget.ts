export type BudgetStatus = 'safe' | 'watching' | 'approaching' | 'over';

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  icon: string;
  color: string;
  subcategories?: string[];
}

export interface BudgetFormData {
  category: string;
  limit: number;
  icon?: string;
  color?: string;
  subcategories?: string[];
}
