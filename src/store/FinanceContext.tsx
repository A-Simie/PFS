import { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Transaction, Budget, TransactionFormData, BudgetFormData } from '../types';
import { api } from '../services/api';

interface FinanceState {
  transactions: Transaction[];
  budgets: Budget[];
  isLoading: boolean;
  error: string | null;
}

type FinanceAction =
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'SET_BUDGETS'; payload: Budget[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'INIT'; payload: { transactions: Transaction[]; budgets: Budget[] } };

function financeReducer(state: FinanceState, action: FinanceAction): FinanceState {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        transactions: action.payload.transactions,
        budgets: action.payload.budgets,
        isLoading: false,
      };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'SET_BUDGETS':
      return { ...state, budgets: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

interface FinanceContextType extends FinanceState {
  addTransaction: (data: TransactionFormData) => void;
  updateTransaction: (id: string, data: Partial<TransactionFormData>) => void;
  deleteTransaction: (id: string) => void;
  addBudget: (data: BudgetFormData) => void;
  updateBudget: (id: string, data: Partial<BudgetFormData>) => void;
  deleteBudget: (id: string) => void;
  clearError: () => void;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(financeReducer, {
    transactions: [],
    budgets: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    try {
      const transactions = api.getTransactions();
      const budgets = api.getBudgets();
      const updated = api.recalculateBudgetSpending(transactions, budgets);
      dispatch({ type: 'INIT', payload: { transactions, budgets: updated } });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load financial data' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const addTransaction = useCallback((data: TransactionFormData) => {
    try {
      const newTxn: Transaction = { ...data, id: uuidv4() };
      const txns = api.addTransaction(newTxn);
      dispatch({ type: 'SET_TRANSACTIONS', payload: txns });
      const budgets = api.getBudgets();
      const updated = api.recalculateBudgetSpending(txns, budgets);
      dispatch({ type: 'SET_BUDGETS', payload: updated });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add transaction' });
    }
  }, []);

  const updateTransaction = useCallback((id: string, data: Partial<TransactionFormData>) => {
    try {
      const txns = api.updateTransaction(id, data);
      dispatch({ type: 'SET_TRANSACTIONS', payload: txns });
      const budgets = api.getBudgets();
      const updated = api.recalculateBudgetSpending(txns, budgets);
      dispatch({ type: 'SET_BUDGETS', payload: updated });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update transaction' });
    }
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    try {
      const txns = api.deleteTransaction(id);
      dispatch({ type: 'SET_TRANSACTIONS', payload: txns });
      const budgets = api.getBudgets();
      const updated = api.recalculateBudgetSpending(txns, budgets);
      dispatch({ type: 'SET_BUDGETS', payload: updated });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete transaction' });
    }
  }, []);

  const addBudget = useCallback((data: BudgetFormData) => {
    try {
      const newBudget: Budget = {
        ...data,
        id: uuidv4(),
        spent: 0,
        icon: data.icon || 'circle',
        color: data.color || '#0fb874',
      };
      const budgets = api.addBudget(newBudget);
      const txns = api.getTransactions();
      const updated = api.recalculateBudgetSpending(txns, budgets);
      dispatch({ type: 'SET_BUDGETS', payload: updated });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add budget' });
    }
  }, []);

  const updateBudget = useCallback((id: string, data: Partial<BudgetFormData>) => {
    try {
      const budgets = api.updateBudget(id, data);
      dispatch({ type: 'SET_BUDGETS', payload: budgets });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update budget' });
    }
  }, []);

  const deleteBudget = useCallback((id: string) => {
    try {
      const budgets = api.deleteBudget(id);
      dispatch({ type: 'SET_BUDGETS', payload: budgets });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete budget' });
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  return (
    <FinanceContext.Provider
      value={{
        ...state,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addBudget,
        updateBudget,
        deleteBudget,
        clearError,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance(): FinanceContextType {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}
