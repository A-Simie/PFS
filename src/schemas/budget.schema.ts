import { z } from 'zod';
import { EXPENSE_CATEGORIES } from '../constants/categories';

export const budgetSchema = z.object({
  category: z
    .string()
    .min(1, 'Category is required')
    .refine((val) => (EXPENSE_CATEGORIES as readonly string[]).includes(val), {
      message: 'Please select a valid expense category',
    }),
  limit: z
    .number({ message: 'Budget limit must be a valid number' })
    .positive('Budget limit must be greater than zero')
    .max(999999999, 'Budget limit is too large'),
  icon: z.string().optional(),
  color: z.string().optional(),
  subcategories: z.array(z.string()).optional(),
});

export type BudgetSchemaType = z.infer<typeof budgetSchema>;
