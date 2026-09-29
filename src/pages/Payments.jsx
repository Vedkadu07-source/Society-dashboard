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
      <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-primary-50 to-transparent rounded-bl-full opacity-60 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className={`p-3.5 rounded-xl shrink-0 border shadow-sm ${currentDuePaid ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
              {currentDuePaid ? (
                <CheckCircle2 size={28} className="text-emerald-500" />
              ) : (
                <Clock size={28} className="text-amber-500" />
              )}
            </div>
            <div>
              <p className="text-[13px] font-bold text-surface-500 uppercase tracking-wide mb-1">
                Maintenance Fee — {CURRENT_DUE.month}
              </p>
              <p className="text-3xl font-bold text-surface-900 tracking-tight mb-2">{formatCurrency(CURRENT_DUE.amount)}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm font-medium">
                <span className="flex items-center gap-1.5 text-surface-600 bg-surface-50 px-2.5 py-1 rounded-md border border-surface-200">
                  <CalendarDays size={14} className="text-surface-400" />
                  Due: {formatDate(CURRENT_DUE.dueDate)}
                </span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide border ${
                  currentDuePaid ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' : 'bg-amber-50 text-amber-700 border-amber-200/60'
                }`}>
                  {currentDuePaid ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {!currentDuePaid && (
            <button
              onClick={() => setPayModal(true)}
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-sm shrink-0"
            >
              <CreditCard size={18} />
              Pay Maintenance
            </button>
          )}
        </div>
        {currentDuePaid && (
          <div className="relative z-10 mt-6 pt-4 border-t border-surface-100 flex items-center gap-2 text-sm font-medium text-emerald-700">
            <CheckCircle2 size={16} />
            Your payment for {CURRENT_DUE.month} has been successfully recorded.
          </div>
        )}
      </div>

      {/* Payment history */}
      <div>
        <h2 className="text-xl font-bold text-surface-900 tracking-tight mb-4">Payment History</h2>

        {payments.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-surface-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 border-b border-surface-200 text-surface-500 text-left text-[11px] uppercase tracking-wider font-bold">
                    <th className="px-5 py-4">Month</th>
                    <th className="px-5 py-4 text-right">Amount</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-surface-50 transition-colors group">
                      <td className="px-5 py-4 font-bold text-surface-900">{p.month}</td>
                      <td className="px-5 py-4 text-right font-medium text-surface-700">{formatCurrency(p.amount)}</td>
                      <td className="px-5 py-4 text-surface-500 font-medium">{formatDate(p.date)}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide border ${
                          p.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' : 'bg-amber-50 text-amber-700 border-amber-200/60'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setReceipt(p)}
                          className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
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
                <div key={p.id} className="bg-white rounded-xl shadow-sm border border-surface-200 p-4">
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
