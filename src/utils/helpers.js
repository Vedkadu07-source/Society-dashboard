// ---------------------------------------------------------------------------
// Helper utilities
// ---------------------------------------------------------------------------

/** Return a greeting based on the current hour */
export function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/** Format a date string (YYYY-MM-DD) to a human-readable form */
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/** Format currency in INR */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Generate a random ID with a prefix */
export function generateId(prefix = 'ID') {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${num}`;
}

/** Generate a transaction ID */
export function generateTxnId() {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `TXN-DEMO-${num}`;
}

/** Validate email */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Validate Indian mobile number */
export function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone.replace(/[\s-]/g, ''));
}

/** Get today's date as YYYY-MM-DD */
export function todayISO() {
  return new Date().toISOString().split('T')[0];
}

/** Status badge color classes */
export function statusColor(status) {
  const map = {
    Submitted: 'bg-amber-50 text-amber-700 border border-amber-200',
    'In Progress': 'bg-blue-50 text-blue-700 border border-blue-200',
    Resolved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Rejected: 'bg-red-50 text-red-700 border border-red-200',
    Paid: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    Overdue: 'bg-red-50 text-red-700 border border-red-200',
  };
  return map[status] || 'bg-surface-100 text-surface-600 border border-surface-200';
}
