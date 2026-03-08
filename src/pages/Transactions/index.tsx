import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Download, MoreVertical, Pencil, Trash2, Filter } from 'lucide-react';
import { useFinance } from '../../store/FinanceContext';
import { useNotifications } from '../../store/NotificationContext';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { AddTransactionModal } from '../../features/transactions/AddTransactionModal';
import { formatCurrency } from '../../utils/formatCurrency';
import { calculateTotalIncome, calculateTotalExpenses, calculateNetBalance } from '../../utils/calculateTotals';
import type { Transaction, TransactionType } from '../../types';
import { exportTransactionsCSV } from '../../utils/csvExport';

type TabFilter = 'all' | TransactionType | 'recurring';

const ITEMS_PER_PAGE = 10;

export default function Transactions() {
  const { transactions, deleteTransaction, isLoading, error } = useFinance();
  const { addNotification } = useNotifications();
  const [showModal, setShowModal] = useState(false);
  const [editingTxn, setEditingTxn] = useState<Transaction | null>(null);
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const totalIncome = useMemo(() => calculateTotalIncome(transactions), [transactions]);
  const totalExpenses = useMemo(() => calculateTotalExpenses(transactions), [transactions]);
  const netFlow = useMemo(() => calculateNetBalance(transactions), [transactions]);

  const RECURRING_CATEGORIES = ['Software', 'Entertainment', 'Utilities'];

  const filtered = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (activeTab === 'all') return sorted;
    if (activeTab === 'recurring') {
      return sorted.filter((t) => RECURRING_CATEGORIES.includes(t.category));
    }
    return sorted.filter((t) => t.type === activeTab);
  }, [transactions, activeTab]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(
    () => filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [filtered, currentPage]
  );

  const filteredCount = filtered.length;

  const tabs: { key: TabFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All Transactions', count: transactions.length },
    { key: 'income', label: 'Income', count: transactions.filter(t => t.type === 'income').length },
    { key: 'expense', label: 'Expenses', count: transactions.filter(t => t.type === 'expense').length },
    { key: 'recurring', label: 'Recurring', count: transactions.filter(t => RECURRING_CATEGORIES.includes(t.category)).length },
  ];

  const handleEdit = (txn: Transaction) => {
    setEditingTxn(txn);
    setShowModal(true);
    setOpenMenuId(null);
  };

  const handleDelete = (id: string) => {
    const txn = transactions.find(t => t.id === id);
    if (txn) {
      deleteTransaction(id);
      addNotification(
        'Transaction Deleted',
        `Removed "${txn.description}" (${formatCurrency(txn.amount)})`,
        'danger'
      );
    }
    setOpenMenuId(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTxn(null);
  };

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
          title="No Transactions Yet"
          description="Start tracking your financial activity by adding your first transaction."
          actionLabel="Add Transaction"
          onAction={() => setShowModal(true)}
        />
        <AddTransactionModal isOpen={showModal} onClose={handleCloseModal} />
      </>
    );
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Transaction History</h1>
            <p className="text-text-muted text-sm mt-1">Track your spending and income across all accounts.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => {
                exportTransactionsCSV(filtered);
                addNotification('Export Successful', 'Your transactions have been downloaded as CSV.', 'success');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-bg-panel border border-border rounded-xl text-sm font-medium hover:bg-bg-dark transition-colors"
            >
              <Download size={16} />
              Export
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-full text-sm transition-colors"
            >
              <Plus size={18} />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Net Flow</p>
            <p className={`text-2xl font-bold mt-1 ${netFlow >= 0 ? 'text-primary' : 'text-danger'}`}>
              {netFlow >= 0 ? '+' : ''}{formatCurrency(netFlow)}
            </p>
          </Card>
          <Card className="p-5" delay={0.05}>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Income</p>
            <p className="text-2xl font-bold mt-1 text-primary">{formatCurrency(totalIncome)}</p>
          </Card>
          <Card className="p-5" delay={0.1}>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Expenses</p>
            <p className="text-2xl font-bold mt-1 text-danger">-{formatCurrency(totalExpenses)}</p>
          </Card>
          <Card className="p-5" delay={0.15}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Showing</p>
                <p className="text-2xl font-bold mt-1">{filteredCount} results</p>
              </div>
              <Filter size={18} className="text-text-muted" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex gap-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setCurrentPage(1); }}
                className={`pb-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-muted hover:text-text-primary'
                }`}
              >
                {tab.label}
              <span className="ml-1.5 text-xs bg-bg-dark px-1.5 py-0.5 rounded-full">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Date</th>
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Description</th>
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4 hidden md:table-cell">Category</th>
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4 hidden sm:table-cell">Type</th>
                  <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Amount</th>
                  <th className="text-center text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <AnimatePresence mode="popLayout" initial={false}>
                  {paginated.map((txn, index) => (
                    <motion.tr
                      key={txn.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.04,
                        ease: "easeOut"
                      }}
                      className="hover:bg-bg-dark/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                        {new Date(txn.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold">{txn.description}</p>
                        {txn.note && <p className="text-xs text-text-muted mt-0.5">{txn.note}</p>}
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm text-text-secondary">{txn.category}</span>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span
                          className={`inline-block px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider ${
                            txn.type === 'income'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-danger/10 text-danger'
                          }`}
                        >
                          {txn.type}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-right text-sm font-bold whitespace-nowrap ${
                        txn.type === 'income' ? 'text-primary' : 'text-danger'
                      }`}>
                        {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                      </td>
                      <td className="px-6 py-4 text-center relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === txn.id ? null : txn.id)}
                          className="p-1.5 rounded-lg hover:bg-bg-dark text-text-muted hover:text-text-primary transition-colors"
                        >
                          <MoreVertical size={16} />
                        </button>
                        <AnimatePresence>
                          {openMenuId === txn.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-6 top-full mt-1 z-20 bg-bg-panel border border-border rounded-xl shadow-xl overflow-hidden w-36"
                            >
                              <button
                                onClick={() => handleEdit(txn)}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-bg-dark transition-colors text-text-primary"
                              >
                                <Pencil size={14} /> Edit
                              </button>
                              <button
                                onClick={() => handleDelete(txn.id)}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-danger/10 transition-colors text-danger"
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-border">
              <p className="text-sm text-text-muted">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} transactions
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg text-sm border border-border hover:bg-bg-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'border border-border hover:bg-bg-dark'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                {totalPages > 5 && <span className="px-2 py-1.5 text-text-muted">...</span>}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg text-sm border border-border hover:bg-bg-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </Card>
      </motion.div>

      <AddTransactionModal
        isOpen={showModal}
        onClose={handleCloseModal}
        editingTransaction={editingTxn}
      />
    </>
  );
}
