import { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Download, Home, Utensils, Film, Car, Zap, Pencil, Trash2 } from 'lucide-react';
import { useFinance } from '../../store/FinanceContext';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { CategoryChart } from '../../components/charts/CategoryChart';
import { AddTransactionModal } from '../../features/transactions/AddTransactionModal';
import { formatCurrency } from '../../utils/formatCurrency';
import { calculateTotalExpenses } from '../../utils/calculateTotals';
import type { Budget, BudgetStatus } from '../../types';
import { Modal } from '../../components/ui/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { budgetSchema, type BudgetSchemaType } from '../../schemas/budget.schema';
import { EXPENSE_CATEGORIES } from '../../constants/categories';
import { exportBudgetsCSV } from '../../utils/csvExport';
import { useNotifications } from '../../store/NotificationContext';

const ICON_MAP: Record<string, typeof Home> = {
  home: Home,
  utensils: Utensils,
  film: Film,
  car: Car,
  zap: Zap,
};

function getBudgetStatus(spent: number, limit: number): { label: string; status: BudgetStatus; colorClass: string } {
  const ratio = limit > 0 ? spent / limit : 0;
  if (ratio > 1) return { label: 'OVER LIMIT', status: 'over', colorClass: 'text-danger bg-danger/10' };
  if (ratio >= 0.9) return { label: 'APPROACHING', status: 'approaching', colorClass: 'text-warning bg-warning/10' };
  if (ratio >= 0.75) return { label: 'WATCH CLOSELY', status: 'watching', colorClass: 'text-accent-gold bg-accent-gold/10' };
  return { label: 'SAFE RANGE', status: 'safe', colorClass: 'text-primary bg-primary/10' };
}

function getProgressColor(status: BudgetStatus): string {
  switch (status) {
    case 'over': return 'bg-danger';
    case 'approaching': return 'bg-warning';
    case 'watching': return 'bg-accent-gold';
    default: return 'bg-primary';
  }
}

export default function Budgets() {
  const { transactions, budgets, addBudget, updateBudget, deleteBudget, isLoading, error } = useFinance();
  const { addNotification } = useNotifications();
  const [showTxnModal, setShowTxnModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const totalExpenses = useMemo(() => calculateTotalExpenses(transactions), [transactions]);


  const averageDailySpend = useMemo(() => {
    if (transactions.length === 0) return 0;
    const dates = transactions.filter(t => t.type === 'expense').map(t => new Date(t.date).getTime());
    if (dates.length === 0) return 0;
    const dayRange = Math.max(1, (Math.max(...dates) - Math.min(...dates)) / (1000 * 60 * 60 * 24));
    return totalExpenses / dayRange;
  }, [transactions, totalExpenses]);

  const projectedSavings = useMemo(() => {
    const totalBudgetLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    return Math.max(0, totalBudgetLimit - totalSpent);
  }, [budgets]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<BudgetSchemaType>({
    resolver: zodResolver(budgetSchema),
    defaultValues: editingBudget
      ? { category: editingBudget.category, limit: editingBudget.limit }
      : { category: '', limit: 0 },
  });

  const openEditModal = useCallback((budget: Budget) => {
    setEditingBudget(budget);
    reset({ category: budget.category, limit: budget.limit });
    setShowBudgetModal(true);
  }, [reset]);

  const openNewModal = useCallback(() => {
    setEditingBudget(null);
    reset({ category: '', limit: 0 });
    setShowBudgetModal(true);
  }, [reset]);

  const onBudgetSubmit = (data: BudgetSchemaType) => {
    if (editingBudget) {
      updateBudget(editingBudget.id, data);
    } else {
      addBudget(data);
    }
    setShowBudgetModal(false);
    setEditingBudget(null);
    reset();
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="bg-danger/10 text-danger px-6 py-4 rounded-xl text-sm">{error}</div>
      </div>
    );
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Spending Analysis</h1>
            <p className="text-text-muted text-sm mt-1">
              Detailed breakdown of your monthly allocations and budget health.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowTxnModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-full text-sm transition-colors"
            >
              <Plus size={18} />
              Add Transaction
            </button>
            <button 
              onClick={() => {
                exportBudgetsCSV(budgets);
                addNotification('Export Successful', 'Your budget data has been downloaded as CSV.', 'success');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-bg-panel border border-border rounded-xl text-sm font-medium hover:bg-bg-dark transition-colors"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left - Donut Chart */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Category Distribution</h3>
                <span className="text-sm text-text-muted">
                  {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <CategoryChart transactions={transactions} />
            </Card>

            {/* Budget Insights */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary">Budget Insights</h4>
                  <p className="text-sm text-text-secondary mt-1">
                    You&apos;ve saved 12% more than last month. Keep it up!
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right - Budget Cards */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Monthly Budgets</h3>
              <button
                onClick={openNewModal}
                className="text-sm font-medium text-primary hover:underline"
              >
                Edit Limits
              </button>
            </div>

            {budgets.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-text-muted mb-4">No budgets set up yet</p>
                <button
                  onClick={openNewModal}
                  className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-full text-sm transition-colors"
                >
                  Add Budget
                </button>
              </Card>
            ) : (
              budgets.map((budget, i) => {
                const { label, status, colorClass } = getBudgetStatus(budget.spent, budget.limit);
                const percentage = budget.limit > 0 ? Math.min((budget.spent / budget.limit) * 100, 100) : 0;
                const IconComponent = ICON_MAP[budget.icon] || Home;
                return (
                  <motion.div
                    key={budget.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${budget.color}20`, color: budget.color }}
                          >
                            <IconComponent size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm">{budget.category}</h4>
                            <p className="text-xs text-text-muted">
                              {budget.subcategories?.join(', ') || 'General'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex items-start gap-2">
                          <div>
                            <p className="text-sm font-bold">
                              {formatCurrency(budget.spent)}{' '}
                              <span className="text-text-muted font-normal">/ {formatCurrency(budget.limit)}</span>
                            </p>
                            <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mt-1 ${colorClass}`}>
                              {label}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => openEditModal(budget)}
                              className="p-1 rounded hover:bg-bg-dark text-text-muted hover:text-text-primary transition-colors"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => deleteBudget(budget.id)}
                              className="p-1 rounded hover:bg-danger/10 text-text-muted hover:text-danger transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="h-2 bg-bg-dark rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                          className={`h-full rounded-full ${getProgressColor(status)}`}
                        />
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-5">
            <p className="text-sm text-text-muted">Average Daily Spend</p>
            <p className="text-2xl font-bold mt-1">{formatCurrency(averageDailySpend)}</p>
            <p className="text-xs text-primary mt-1">↘ 4.2% from last week</p>
          </Card>
          <Card className="p-5" delay={0.05}>
            <p className="text-sm text-text-muted">Projected Savings</p>
            <p className="text-2xl font-bold mt-1">{formatCurrency(projectedSavings)}</p>
            <p className="text-xs text-primary mt-1">🛡 On track for goals</p>
          </Card>
          <Card className="p-5" delay={0.1}>
            <p className="text-sm text-text-muted">Subscription Load</p>
            <p className="text-2xl font-bold mt-1">{formatCurrency(184.50)}</p>
            <p className="text-xs text-text-muted mt-1">↻ 12 active services</p>
          </Card>
        </div>
      </motion.div>

      {/* Add Transaction Modal */}
      <AddTransactionModal isOpen={showTxnModal} onClose={() => setShowTxnModal(false)} />

      {/* Add/Edit Budget Modal */}
      <Modal
        isOpen={showBudgetModal}
        onClose={() => { setShowBudgetModal(false); setEditingBudget(null); reset(); }}
        title={editingBudget ? 'Edit Budget' : 'Add Budget'}
      >
        <form onSubmit={handleSubmit(onBudgetSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Category</label>
            <select
              {...register('category')}
              disabled={!!editingBudget}
              className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none disabled:opacity-50"
            >
              <option value="">Select category</option>
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {formErrors.category && <p className="text-danger text-xs mt-1">{formErrors.category.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Budget Limit ($)</label>
            <input
              type="number"
              step="0.01"
              {...register('limit', { valueAsNumber: true })}
              className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="0.00"
            />
            {formErrors.limit && <p className="text-danger text-xs mt-1">{formErrors.limit.message}</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => { setShowBudgetModal(false); setEditingBudget(null); reset(); }}
              className="flex-1 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-bg-dark transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-colors"
            >
              {editingBudget ? 'Save Changes' : 'Add Budget'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
