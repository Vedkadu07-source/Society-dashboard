import { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../context/AppContext';
import { formatCurrency, generateTxnId, todayISO, formatDate } from '../utils/helpers';
import { CURRENT_DUE } from '../data/mockData';
import { CreditCard, Smartphone, Building2, Loader2, CheckCircle } from 'lucide-react';

const METHODS = [
  { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: Building2, desc: 'All major banks' },
];

export default function PaymentModal({ open, onClose }) {
  const { addPayment, addToast } = useApp();
  const [step, setStep] = useState('select'); // select | processing | success
  const [method, setMethod] = useState('');
  const [txnId, setTxnId] = useState('');
  const [error, setError] = useState('');

  const handlePay = () => {
    if (!method) {
      setError('Please select a payment method.');
      return;
    }
    setError('');
    setStep('processing');

    // Simulate processing
    setTimeout(() => {
      const tid = generateTxnId();
      setTxnId(tid);
      addPayment({
        id: `PAY-${Date.now().toString().slice(-4)}`,
        month: CURRENT_DUE.month,
        amount: CURRENT_DUE.amount,
        date: todayISO(),
        status: 'Paid',
        transactionId: tid,
      });
      addToast('Payment completed successfully!', 'success');
      setStep('success');
    }, 1500);
  };

  const handleClose = () => {
    setStep('select');
    setMethod('');
    setError('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Pay Maintenance Fee">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-6 relative px-4">
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-surface-200 z-0" />
        <div className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-primary-600 z-0 transition-all duration-300" 
             style={{ width: step === 'select' ? '0%' : step === 'processing' ? '50%' : 'calc(100% - 3rem)' }} />
        
        {['select', 'processing', 'success'].map((s, i) => {
          const isActive = step === s || (step === 'success' && i < 2) || (step === 'processing' && i === 0);
          const isCurrent = step === s;
          return (
            <div key={s} className="relative z-10 flex flex-col items-center gap-1 bg-white px-2">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                isActive ? 'bg-primary-600 text-white shadow-sm' : 'bg-surface-100 text-surface-400'
              } ${isCurrent ? 'ring-4 ring-primary-50' : ''}`}>
                {i + 1}
              </div>
              <span className={`text-[10px] font-semibold absolute -bottom-5 w-16 text-center ${isActive ? 'text-primary-700' : 'text-surface-400'}`}>
                {i === 0 ? 'Review' : i === 1 ? 'Payment' : 'Complete'}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        {step === 'select' && (
          <div className="space-y-5">
            {/* Amount summary */}
            <div className="bg-surface-50 rounded-xl p-5 border border-surface-200/80 text-center">
              <p className="text-[10px] font-bold text-surface-500 uppercase tracking-widest mb-1">Maintenance Fee — {CURRENT_DUE.month}</p>
              <p className="text-3xl font-bold text-surface-900 tracking-tight">{formatCurrency(CURRENT_DUE.amount)}</p>
              <p className="text-[11px] font-medium text-surface-400 mt-2">Due: {formatDate(CURRENT_DUE.dueDate)}</p>
            </div>

            {/* Method selection */}
            <div>
              <p className="text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-3">Select Payment Method</p>
              <div className="space-y-2.5">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => { setMethod(m.id); setError(''); }}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 text-left focus:outline-none focus:ring-4 ${
                      method === m.id
                        ? 'border-primary-500 bg-primary-50/50 ring-primary-500/10 shadow-sm'
                        : 'border-surface-200 hover:border-primary-300 bg-white'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${method === m.id ? 'bg-primary-100 text-primary-600' : 'bg-surface-100 text-surface-500'}`}>
                      <m.icon size={16} />
                    </div>
                    <div>
                      <p className={`text-[13px] font-semibold ${method === m.id ? 'text-primary-700' : 'text-surface-800'}`}>{m.label}</p>
                      <p className="text-[11px] font-medium text-surface-500 mt-0.5">{m.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-xs text-red-600 font-semibold text-center">{error}</p>}

            <p className="text-[10px] font-bold text-surface-400 text-center uppercase tracking-widest mt-2">
              Demo payment. No real money will be charged.
            </p>

            <button
              onClick={handlePay}
              className="w-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold py-3 rounded-xl transition-all shadow-[0_4px_12px_rgba(79,70,229,0.2)] hover:shadow-[0_4px_16px_rgba(79,70,229,0.3)] mt-2"
            >
              Pay {formatCurrency(CURRENT_DUE.amount)}
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 size={32} className="text-primary-600 animate-spin" />
            <p className="text-[15px] text-surface-900 font-semibold tracking-tight">Processing payment…</p>
            <p className="text-xs font-medium text-surface-500">Please wait while we verify your payment.</p>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center py-6 space-y-5">
            <div className="bg-emerald-50 p-4 rounded-full border border-emerald-100 shadow-sm">
              <CheckCircle size={32} className="text-emerald-500" />
            </div>
            <div className="text-center">
              <h3 className="text-[17px] font-bold text-surface-900 tracking-tight mb-1">Payment Successful</h3>
              <p className="text-xs text-surface-500">Your maintenance fee has been recorded.</p>
            </div>
            
            <div className="bg-surface-50 rounded-xl p-4 border border-surface-200/80 w-full text-sm space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-surface-500 uppercase tracking-widest">Transaction ID</span>
                <span className="font-mono text-xs font-semibold text-surface-700 bg-white px-2 py-0.5 rounded border border-surface-200">{txnId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-surface-500 uppercase tracking-widest">Amount</span>
                <span className="font-bold text-surface-900">{formatCurrency(CURRENT_DUE.amount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-surface-500 uppercase tracking-widest">Date</span>
                <span className="font-semibold text-surface-700">{formatDate(todayISO())}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
