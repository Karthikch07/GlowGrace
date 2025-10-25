export function formatCurrency(value: number | string | undefined | null) {
  const n = typeof value === 'string' ? parseFloat(value) : (value ?? 0);
  
  const num = Number.isFinite(n) ? n as number : 0;
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(num);
}
