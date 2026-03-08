import { z } from 'zod';
import { ALL_CATEGORIES } from '../constants/categories';

export const transactionSchema = z.object({
  type: z.enum(['income', 'expense'], {
    message: 'Transaction type is required',
  }),
  amount: z
    .number({ message: 'Amount must be a valid number' })
    .positive('Amount must be greater than zero')
    .max(999999999, 'Amount is too large'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(120, 'Description must be 120 characters or less'),
  category: z
    .string()
    .min(1, 'Category is required')
    .refine((val) => (ALL_CATEGORIES as readonly string[]).includes(val), {
      message: 'Please select a valid category',
    }),
  date: z.string().min(1, 'Date is required').refine(
    (val) => !isNaN(Date.parse(val)),
    { message: 'Please enter a valid date' }
  ),
  note: z.string().max(200, 'Note must be 200 characters or less').optional(),
});

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
