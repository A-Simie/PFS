import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, PiggyBank, Plus } from 'lucide-react';
import { useFinance } from '../../store/FinanceContext';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { SpendingChart } from '../../components/charts/SpendingChart';
import { AddTransactionModal } from '../../features/transactions/AddTransactionModal';
import { formatCurrency } from '../../utils/formatCurrency';
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateNetBalance,
  calculateSavingsRate,
} from '../../utils/calculateTotals';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Dashboard() {
  const { transactions, budgets, isLoading, error } = useFinance();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const totalIncome = useMemo(() => calculateTotalIncome(transactions), [transactions]);
  const totalExpenses = useMemo(() => calculateTotalExpenses(transactions), [transactions]);
  const netBalance = useMemo(() => calculateNetBalance(transactions), [transactions]);
  const savingsRate = useMemo(() => calculateSavingsRate(transactions), [transactions]);

  const recentTransactions = useMemo(
    () =>
      [...transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4),
    [transactions]
  );

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="bg-danger/10 text-danger px-6 py-4 rounded-xl text-sm">{error}</div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <>
        <EmptyState
          title="Welcome to Personal Finance Snapshot"
          description="Start tracking your wealth by adding your first transaction. Connect your accounts to see a unified view of your net worth."
          actionLabel="Add First Transaction"
          onAction={() => setShowModal(true)}
          id="add-transaction-btn"
        />
        <AddTransactionModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  const summaryCards = [
    {
      label: 'Total Income',
      value: formatCurrency(totalIncome),
      change: '+12% from last month',
      changeColor: 'text-primary',
      icon: TrendingUp,
      iconBg: 'bg-primary/20 text-primary',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      change: '+5% from last month',
      changeColor: 'text-danger',
      icon: TrendingDown,
      iconBg: 'bg-danger/20 text-danger',
    },
    {
      label: 'Net Balance',
      value: formatCurrency(netBalance),
      change: '+18% from last month',
      changeColor: 'text-primary',
      icon: Wallet,
      iconBg: 'bg-accent-gold/20 text-accent-gold',
    },
    {
      label: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      change: 'Stable vs last month',
      changeColor: 'text-text-muted',
      icon: PiggyBank,
      iconBg: 'bg-primary/20 text-primary',
    },
  ];

  return (
    <>
      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
        {/* Add Transaction Button */}
        <div className="flex justify-end">
          <button
            id="add-transaction-btn"
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-full text-sm transition-colors"
          >
            <Plus size={18} />
            Add Transaction
          </button>
        </div>

        {/* Summary Cards */}
        <motion.div 
          id="financial-summary-cards"
          variants={fadeUp} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {summaryCards.map((card, i) => (
            <Card key={card.label} delay={i * 0.08} className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-text-muted font-medium text-sm">{card.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                  <card.icon size={18} />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold tracking-tight mb-1">{card.value}</p>
              <p className={`text-sm font-medium ${card.changeColor} flex items-center gap-1`}>
                {card.change}
              </p>
            </Card>
          ))}
        </motion.div>

        {/* Charts Row */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spending Chart */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Spending Comparison</h3>
                <p className="text-sm text-text-muted">Income vs Expenses performance</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs font-medium text-text-muted">Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent-gold" />
                  <span className="text-xs font-medium text-text-muted">Expenses</span>
                </div>
              </div>
            </div>
            <SpendingChart transactions={transactions} />
          </Card>

          {/* Budget Progress */}
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6">Budget Progress</h3>
            <div className="space-y-5">
              {budgets.slice(0, 4).map((budget) => {
                const percentage = budget.limit > 0 ? Math.min((budget.spent / budget.limit) * 100, 100) : 0;
                const barColor = percentage >= 90 ? 'bg-accent-gold' : 'bg-primary';
                return (
                  <div key={budget.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">{budget.category}</span>
                      <span className="font-medium">
                        {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                      </span>
                    </div>
                    <div className="h-2 bg-bg-dark rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-full rounded-full ${barColor}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => navigate('/budgets')}
              className="w-full mt-6 py-3 rounded-xl border border-dashed border-border-light text-sm font-medium hover:bg-bg-dark transition-colors text-text-muted"
            >
              Add New Category
            </button>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div variants={fadeUp}>
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold">Recent Transactions</h3>
              <button
                onClick={() => navigate('/transactions')}
                className="text-sm font-medium text-primary hover:underline"
              >
                View All
              </button>
            </div>
            <div className="divide-y divide-border">
              {recentTransactions.map((txn) => (
                <div
                  key={txn.id}
                  className="p-4 md:p-6 flex items-center justify-between hover:bg-bg-dark/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold ${
                        txn.type === 'income'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-danger/10 text-danger'
                      }`}
                    >
                      {txn.category.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-sm md:text-base">{txn.description}</p>
                      <p className="text-xs text-text-muted">
                        {txn.category} &bull; {new Date(txn.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <p className={`font-bold text-sm md:text-base ${txn.type === 'income' ? 'text-primary' : 'text-danger'}`}>
                    {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <AddTransactionModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
