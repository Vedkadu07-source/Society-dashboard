import { useState } from 'react';
import { useApp } from '../context/AppContext';
import PaymentModal from '../components/PaymentModal';
import ReceiptModal from '../components/ReceiptModal';
import { formatCurrency, formatDate, statusColor } from '../utils/helpers';
import { CURRENT_DUE } from '../data/mockData';
import {
  CalendarDays,
  CreditCard,
  CheckCircle2,
  Clock,
  FileText,
  Receipt,
} from 'lucide-react';

export default function Payments() {
  const { payments, currentDuePaid } = useApp();
  const [payModal, setPayModal] = useState(false);
  const [receipt, setReceipt] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Society Payments</h1>
        <p className="text-surface-500 mt-0.5">Manage your monthly maintenance payments.</p>
      </div>

      {/* Current due card */}
      <div className="bg-white rounded-lg border border-surface-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg shrink-0 ${currentDuePaid ? 'bg-emerald-50' : 'bg-amber-50'}`}>
              {currentDuePaid ? (
                <CheckCircle2 size={24} className="text-emerald-600" />
              ) : (
                <Clock size={24} className="text-amber-600" />
              )}
            </div>
            <div>
              <p className="text-sm text-surface-500 mb-1">
                Maintenance Fee — {CURRENT_DUE.month}
              </p>
              <p className="text-2xl font-bold text-surface-900">{formatCurrency(CURRENT_DUE.amount)}</p>
              <div className="flex items-center gap-3 mt-2 text-sm">
                <span className="flex items-center gap-1 text-surface-500">
                  <CalendarDays size={14} />
                  Due: {formatDate(CURRENT_DUE.dueDate)}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${statusColor(currentDuePaid ? 'Paid' : 'Pending')}`}>
                  {currentDuePaid ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {!currentDuePaid && (
            <button
              onClick={() => setPayModal(true)}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shrink-0"
            >
              <CreditCard size={18} />
              Pay Maintenance Fee
            </button>
          )}
        </div>
        {currentDuePaid && (
          <p className="text-xs text-surface-400 mt-3">
            ✓ Your payment for {CURRENT_DUE.month} has been recorded.
          </p>
        )}
      </div>

      {/* Payment history */}
      <div>
        <h2 className="text-lg font-semibold text-surface-900 mb-4">Payment History</h2>

        {payments.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-lg border border-surface-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 text-surface-600 text-left">
                    <th className="px-4 py-3 font-medium">Month</th>
                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-surface-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-surface-800">{p.month}</td>
                      <td className="px-4 py-3 text-right text-surface-700">{formatCurrency(p.amount)}</td>
                      <td className="px-4 py-3 text-surface-500">{formatDate(p.date)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${statusColor(p.status)}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setReceipt(p)}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                        >
                          <FileText size={14} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
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
                  <button
                    onClick={() => setReceipt(p)}
                    className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                  >
                    <FileText size={14} />
                    View Receipt
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white border border-surface-200 rounded-lg p-10 text-center">
            <Receipt size={40} className="text-surface-300 mx-auto mb-3" />
            <h3 className="font-medium text-surface-700 mb-1">No payment history</h3>
            <p className="text-sm text-surface-500">Your payment records will appear here.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <PaymentModal open={payModal} onClose={() => setPayModal(false)} />
      <ReceiptModal open={!!receipt} onClose={() => setReceipt(null)} payment={receipt} />
    </div>
  );
}
