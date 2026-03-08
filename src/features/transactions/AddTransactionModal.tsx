import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema, type TransactionSchemaType } from '../../schemas/transaction.schema';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../constants/categories';
import { Modal } from '../../components/ui/Modal';
import { useFinance } from '../../store/FinanceContext';
import { useNotifications } from '../../store/NotificationContext';
import { formatCurrency } from '../../utils/formatCurrency';
import type { Transaction } from '../../types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingTransaction?: Transaction | null;
}

export function AddTransactionModal({ isOpen, onClose, editingTransaction }: AddTransactionModalProps) {
  const { addTransaction, updateTransaction } = useFinance();
  const { addNotification } = useNotifications();
  const isEditing = !!editingTransaction;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionSchemaType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: editingTransaction
      ? {
          type: editingTransaction.type,
          amount: editingTransaction.amount,
          description: editingTransaction.description,
          category: editingTransaction.category,
          date: editingTransaction.date,
          note: editingTransaction.note || '',
        }
      : {
          type: 'expense',
          amount: 0,
          description: '',
          category: '',
          date: new Date().toISOString().split('T')[0],
          note: '',
        },
  });

  const currentType = watch('type');
  const categories = currentType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const onSubmit = (data: TransactionSchemaType) => {
    if (isEditing && editingTransaction) {
      updateTransaction(editingTransaction.id, data);
      addNotification(
        'Transaction Updated',
        `Successfully updated "${data.description}" (${formatCurrency(data.amount)})`,
        'info'
      );
    } else {
      addTransaction(data);
      addNotification(
        'Transaction Created',
        `New ${data.type} added: "${data.description}" for ${formatCurrency(data.amount)}`,
        'success'
      );
    }
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isEditing ? 'Edit Transaction' : 'Add Transaction'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex rounded-xl overflow-hidden border border-border">
          <button
            type="button"
            onClick={() => { setValue('type', 'expense'); setValue('category', ''); }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              currentType === 'expense'
                ? 'bg-primary text-white'
                : 'bg-bg-dark text-text-muted hover:text-text-primary'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => { setValue('type', 'income'); setValue('category', ''); }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              currentType === 'income'
                ? 'bg-primary text-white'
                : 'bg-bg-dark text-text-muted hover:text-text-primary'
            }`}
          >
            Income
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-text-muted font-light">$</span>
            <input
              type="number"
              step="0.01"
              {...register('amount', { valueAsNumber: true })}
              className="w-full bg-transparent border-b-2 border-border focus:border-primary text-3xl font-light text-text-primary pl-10 py-3 outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0.00"
            />
          </div>
          {errors.amount && <p className="text-danger text-xs mt-1.5">{errors.amount.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Date</label>
            <input
              type="date"
              {...register('date')}
              className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.date && <p className="text-danger text-xs mt-1">{errors.date.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Category</label>
            <select
              {...register('category')}
              className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-danger text-xs mt-1">{errors.category.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">Description</label>
          <input
            type="text"
            {...register('description')}
            className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="What was this for?"
            maxLength={120}
          />
          {errors.description && <p className="text-danger text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-3 rounded-xl border border-border text-sm font-semibold text-text-primary hover:bg-bg-dark transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {isEditing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
