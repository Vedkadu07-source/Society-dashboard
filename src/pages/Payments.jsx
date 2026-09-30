import { useState } from 'react';
import { useApp } from '../context/AppContext';
import PaymentModal from '../components/PaymentModal';
import ReceiptModal from '../components/ReceiptModal';
import { formatCurrency, formatDate } from '../utils/helpers';
import { CURRENT_DUE } from '../data/mockData';
import {
  CreditCard,
  FileText,
  IndianRupee,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function Payments() {
  const { payments, currentDuePaid } = useApp();
  const [payModal, setPayModal] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const lastPayment = payments.length > 0 ? payments[0] : null;

  return (
    <div className="w-full min-w-0">
      
      {/* 
        FINANCIAL HERO
      */}
      <div className="bg-navy-950 w-full pt-12 pb-16 px-6 lg:px-12 relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-3xl font-light text-white tracking-tight mb-8">Maintenance & Dues</h1>
            
            <p className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-2">Current Period — {CURRENT_DUE.month}</p>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 mb-2">
              <span className="text-5xl sm:text-7xl font-light text-white tracking-tight">{formatCurrency(CURRENT_DUE.amount)}</span>
            </div>
            
            {currentDuePaid ? (
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mt-2 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Paid {lastPayment ? formatDate(lastPayment.date) : 'Recently'}
              </p>
            ) : (
              <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mt-2">
                Due {formatDate(CURRENT_DUE.dueDate)}
              </p>
            )}
          </div>

          <div className="shrink-0 flex items-center gap-4">
            {currentDuePaid ? (
              <button 
                onClick={() => setReceipt(lastPayment)}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors border border-white/20"
              >
                View Latest Receipt
              </button>
            ) : (
              <button 
                onClick={() => setPayModal(true)}
                className="bg-white hover:bg-surface-100 text-navy-950 px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                <CreditCard size={14} /> Pay Now
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
        
        {/* MAIN: Ledger */}
        <div className="lg:col-span-8 xl:col-span-9 min-w-0">
          <div className="flex items-center justify-between border-b border-surface-200 pb-4 mb-6">
            <h2 className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em]">Payment Ledger</h2>
          </div>

          <div className="w-full overflow-x-auto">
            {payments.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-surface-900 text-[10px] font-bold text-surface-500 uppercase tracking-widest">
                    <th className="py-3 px-2 font-medium">Period</th>
                    <th className="py-3 px-2 font-medium">Amount</th>
                    <th className="py-3 px-2 font-medium">Date</th>
                    <th className="py-3 px-2 font-medium">Status</th>
                    <th className="py-3 px-2 font-medium text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200">
                  {payments.map((p) => (
                    <tr key={p.id} className="group hover:bg-surface-50/50 transition-colors">
                      <td className="py-4 px-2">
                        <div className="text-sm font-semibold text-surface-900 mb-0.5">{p.month}</div>
                        <div className="text-[11px] font-medium text-surface-500">Maintenance Fee</div>
                      </td>
                      <td className="py-4 px-2 text-sm font-semibold text-surface-900">
                        {formatCurrency(p.amount)}
                      </td>
                      <td className="py-4 px-2 text-xs font-medium text-surface-500">
                        {formatDate(p.date)}
                      </td>
                      <td className="py-4 px-2">
                        <span className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                          p.status === 'Paid' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <button 
                          onClick={() => setReceipt(p)} 
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-primary-600 uppercase tracking-widest inline-flex items-center gap-1"
                        >
                          View <FileText size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-12 text-center text-sm text-surface-400">
                <FileText size={32} className="text-surface-300 mx-auto mb-3" />
                No payment history available.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Insights / Billing Details */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-20 space-y-10">
            
            <div>
              <h2 className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-surface-200">Billing Insights</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-surface-900 mb-1">Due Date Policy</h3>
                  <p className="text-xs text-surface-500 leading-relaxed">
                    Maintenance is due by the 5th of every month. Late payments may attract a penalty of ₹50 per day after the grace period.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-surface-900 mb-1">Payment Methods</h3>
                  <p className="text-xs text-surface-500 leading-relaxed">
                    We accept UPI, Credit/Debit cards, and Net Banking. Cash payments are not accepted at the society office.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface-50 p-6">
              <h3 className="text-xs font-bold text-surface-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <IndianRupee size={14} className="text-primary-600" /> Need Tax Statement?
              </h3>
              <p className="text-xs text-surface-500 mb-4">
                Generate an annual statement of your maintenance payments for tax records.
              </p>
              <button className="text-xs font-bold text-primary-600 hover:text-primary-700 uppercase tracking-widest transition-colors flex items-center gap-1">
                Request Statement <ArrowRight size={12} />
              </button>
            </div>

          </div>
        </div>

      </div>

      <PaymentModal open={payModal} onClose={() => setPayModal(false)} />
      <ReceiptModal open={!!receipt} onClose={() => setReceipt(null)} payment={receipt} />
    </div>
  );
}
