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
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-surface-900 tracking-tight">Society Payments</h1>
        <p className="text-surface-500 mt-2 text-lg">Manage your monthly maintenance payments.</p>
      </div>

      {/* Current due card */}
      <div className="bg-surface-900 rounded-2xl shadow-xl border border-surface-800 p-6 sm:p-8 relative overflow-hidden text-white">
        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-primary-800/40 to-transparent rounded-bl-full opacity-60 pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className={`p-4 rounded-xl shrink-0 shadow-sm ${currentDuePaid ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-primary-500/10 text-primary-400 border border-primary-500/20'}`}>
              {currentDuePaid ? (
                <CheckCircle2 size={32} />
              ) : (
                <Clock size={32} />
              )}
            </div>
            <div>
              <p className="text-[13px] font-bold text-surface-300 uppercase tracking-widest mb-1">
                Maintenance Fee — {CURRENT_DUE.month}
              </p>
              <p className="text-4xl font-black text-white tracking-tight mb-3">{formatCurrency(CURRENT_DUE.amount)}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                <span className="flex items-center gap-1.5 text-surface-300 bg-surface-800/50 px-3 py-1.5 rounded-lg border border-surface-700/50">
                  <CalendarDays size={14} className="text-surface-400" />
                  Due: {formatDate(CURRENT_DUE.dueDate)}
                </span>
                <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide border ${
                  currentDuePaid ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-primary-500/20 text-primary-300 border-primary-500/30'
                }`}>
                  {currentDuePaid ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {!currentDuePaid && (
            <button
              onClick={() => setPayModal(true)}
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-primary-900/20 shrink-0"
            >
              <CreditCard size={18} />
              Pay Maintenance
            </button>
          )}
        </div>
        {currentDuePaid && (
          <div className="relative z-10 mt-6 pt-5 border-t border-surface-800 flex items-center gap-2 text-sm font-medium text-emerald-400">
            <CheckCircle2 size={16} />
            Your payment for {CURRENT_DUE.month} has been successfully recorded.
          </div>
        )}
      </div>

      {/* Payment history */}
      <div>
        <h2 className="text-xl font-bold text-surface-900 tracking-tight mb-5">Payment History</h2>

        {payments.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-surface-200 overflow-hidden">
              <div className="overflow-x-auto w-full min-w-0">
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
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {payments.map((p) => (
                <div key={p.id} className="bg-white rounded-xl shadow-sm border border-surface-200 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold text-surface-900">{p.month}</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide border ${
                      p.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' : 'bg-amber-50 text-amber-700 border-amber-200/60'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-surface-700 font-medium">{formatCurrency(p.amount)}</span>
                    <span className="text-surface-500">{formatDate(p.date)}</span>
                  </div>
                  <button
                    onClick={() => setReceipt(p)}
                    className="w-full text-center bg-surface-50 hover:bg-surface-100 border border-surface-200 text-surface-700 text-sm font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <FileText size={14} />
                    View Receipt
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white border border-surface-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-surface-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-surface-100">
              <Receipt size={32} className="text-surface-400" />
            </div>
            <h3 className="font-bold text-surface-900 mb-2 text-lg">No payment history</h3>
            <p className="text-surface-500 max-w-sm mx-auto">Your payment records will appear here.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <PaymentModal open={payModal} onClose={() => setPayModal(false)} />
      <ReceiptModal open={!!receipt} onClose={() => setReceipt(null)} payment={receipt} />
    </div>
  );
}
