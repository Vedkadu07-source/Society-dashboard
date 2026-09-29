import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate, statusColor } from '../../utils/helpers';
import { IndianRupee, Receipt } from 'lucide-react';

export default function AdminPayments() {
  const { payments, residents } = useApp();

  const totalCollected = payments.filter((p) => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
  const pendingCount = residents.filter((r) => r.paymentStatus === 'Pending').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Payment Overview</h1>
        <p className="text-surface-500 mt-0.5">Monitor society payment collections.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-surface-200 p-5 flex items-start gap-4">
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg">
            <IndianRupee size={22} />
          </div>
          <div>
            <p className="text-sm text-surface-500 mb-1">Total Collected</p>
            <p className="text-xl font-semibold text-surface-900">{formatCurrency(totalCollected)}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-surface-200 p-5 flex items-start gap-4">
          <div className="bg-amber-50 text-amber-600 p-3 rounded-lg">
            <Receipt size={22} />
          </div>
          <div>
            <p className="text-sm text-surface-500 mb-1">Pending Payments</p>
            <p className="text-xl font-semibold text-surface-900">{pendingCount} residents</p>
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div>
        <h2 className="text-lg font-semibold text-surface-900 mb-4">Recent Transactions</h2>

        {payments.length > 0 ? (
          <>
            <div className="hidden md:block bg-white rounded-lg border border-surface-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 text-surface-600 text-left">
                    <th className="px-4 py-3 font-medium">Transaction ID</th>
                    <th className="px-4 py-3 font-medium">Month</th>
                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-surface-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-surface-600">{p.transactionId}</td>
                      <td className="px-4 py-3 text-surface-800">{p.month}</td>
                      <td className="px-4 py-3 text-right text-surface-700">{formatCurrency(p.amount)}</td>
                      <td className="px-4 py-3 text-surface-500">{formatDate(p.date)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${statusColor(p.status)}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3">
              {payments.map((p) => (
                <div key={p.id} className="bg-white rounded-lg border border-surface-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-surface-800">{p.month}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${statusColor(p.status)}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-600">{formatCurrency(p.amount)}</span>
                    <span className="text-surface-500">{formatDate(p.date)}</span>
                  </div>
                  <p className="text-xs text-surface-400 mt-1 font-mono">{p.transactionId}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white border border-surface-200 rounded-lg p-10 text-center">
            <Receipt size={40} className="text-surface-300 mx-auto mb-3" />
            <h3 className="font-medium text-surface-700 mb-1">No transactions yet</h3>
            <p className="text-sm text-surface-500">Payment records will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
