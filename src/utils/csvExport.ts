/**
 * Generic function to export data to CSV and trigger a download
 */
export function downloadCSV(data: any[], filename: string) {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const rows = data.map(obj => 
    headers.map(header => {
      let val = obj[header];
      if (val === null || val === undefined) val = '';
      if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
        val = `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    }).join(',')
  );

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Specifically format transactions for CSV export
 */
export function exportTransactionsCSV(transactions: any[]) {
  const formatted = transactions.map(t => ({
    Date: new Date(t.date).toLocaleDateString(),
    Description: t.description,
    Category: t.category,
    Type: t.type,
    Amount: t.amount,
    Note: t.note || ''
  }));
  
  downloadCSV(formatted, 'transactions');
}

/**
 * Specifically format budgets for CSV export
 */
export function exportBudgetsCSV(budgets: any[]) {
  const formatted = budgets.map(b => ({
    Category: b.category,
    Limit: b.limit,
    Spent: b.spent,
    Remaining: Math.max(0, b.limit - b.spent),
    Status: b.spent > b.limit ? 'Over' : b.spent >= b.limit * 0.9 ? 'Approaching' : 'Safe'
  }));
  
  downloadCSV(formatted, 'budgets');
}
