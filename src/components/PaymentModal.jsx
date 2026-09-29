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
    }, 2000);
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
      <div className="flex items-center justify-between mb-6 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-surface-200 z-0" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary-600 z-0 transition-all duration-300" 
             style={{ width: step === 'select' ? '0%' : step === 'processing' ? '50%' : '100%' }} />
        
        {['select', 'processing', 'success'].map((s, i) => {
          const isActive = step === s || (step === 'success' && i < 2) || (step === 'processing' && i === 0);
          const isCurrent = step === s;
          return (
            <div key={s} className="relative z-10 flex flex-col items-center gap-1 bg-white px-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                isActive ? 'bg-primary-600 text-white shadow-sm' : 'bg-surface-100 text-surface-400'
              } ${isCurrent ? 'ring-4 ring-primary-50' : ''}`}>
                {i + 1}
              </div>
              <span className={`text-[10px] font-medium absolute -bottom-4 w-16 text-center ${isActive ? 'text-primary-700' : 'text-surface-400'}`}>
                {i === 0 ? 'Review' : i === 1 ? 'Payment' : 'Complete'}
              </span>
            </div>
          );
        })}
      </div>

      {step === 'select' && (
        <div className="space-y-5 mt-4">
          {/* Amount summary */}
          <div className="bg-surface-50 rounded-xl p-5 border border-surface-200 text-center">
            <p className="text-sm font-medium text-surface-500 mb-1">Maintenance Fee — {CURRENT_DUE.month}</p>
            <p className="text-3xl font-bold text-surface-900">{formatCurrency(CURRENT_DUE.amount)}</p>
            <p className="text-xs font-medium text-surface-400 mt-2">Due: {formatDate(CURRENT_DUE.dueDate)}</p>
          </div>

          {/* Method selection */}
          <div>
            <p className="text-sm font-medium text-surface-700 mb-3">Select Payment Method</p>
            <div className="space-y-3">
              {METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => { setMethod(m.id); setError(''); }}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 ${
                    method === m.id
                      ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500 shadow-sm'
                      : 'border-surface-200 hover:border-primary-300 hover:shadow-sm bg-white hover:-translate-y-0.5'
                  }`}
                >
                  <m.icon size={22} className={method === m.id ? 'text-primary-600' : 'text-surface-400'} />
                  <div>
                    <p className={`text-sm font-medium ${method === m.id ? 'text-primary-700' : 'text-surface-800'}`}>{m.label}</p>
                    <p className="text-xs font-medium text-surface-400 mt-0.5">{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

          {/* Demo notice */}
          <p className="text-xs font-medium text-surface-400 text-center">
            This is a simulated demo payment. No real money will be charged.
          </p>

          {/* Pay button */}
          <button
            onClick={handlePay}
            className="w-full bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5 text-white font-medium py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Pay {formatCurrency(CURRENT_DUE.amount)}
          </button>
        </div>
      )}

      {step === 'processing' && (
        <div className="flex flex-col items-center justify-center py-10 space-y-4">
          <Loader2 size={40} className="text-primary-600 animate-spin" />
          <p className="text-surface-600 font-medium">Processing payment…</p>
          <p className="text-xs text-surface-400">Please wait while we verify your payment.</p>
        </div>
      )}

      {step === 'success' && (
        <div className="flex flex-col items-center py-6 space-y-4">
          <div className="bg-emerald-50 p-4 rounded-full">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h3 className="text-lg font-semibold text-surface-900">Payment Successful</h3>
          <div className="bg-surface-50 rounded-lg p-4 border border-surface-200 w-full text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-surface-500">Transaction ID</span>
              <span className="font-medium text-surface-700">{txnId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">Amount</span>
              <span className="font-medium text-surface-700">{formatCurrency(CURRENT_DUE.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">Date</span>
              <span className="font-medium text-surface-700">{formatDate(todayISO())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">Status</span>
              <span className="font-medium text-emerald-600">Paid</span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      )}
    </Modal>
  );
}
