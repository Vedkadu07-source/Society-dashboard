import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { Search, TrendingUp, Bell, CheckCircle2, ArrowRight } from 'lucide-react';
import { CURRENT_DUE } from '../../data/mockData';

export default function AdminPayments() {
  const { residents, addToast, updateResident } = useApp();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const totalExpected = residents.length * CURRENT_DUE.amount;
  const paidCount = residents.filter(r => r.paymentStatus === 'Paid').length;
  const totalCollected = paidCount * CURRENT_DUE.amount;
  const pendingCount = residents.filter(r => r.paymentStatus === 'Pending').length;
  const collectionRate = totalExpected > 0 ? Math.round((totalCollected / totalExpected) * 100) : 0;

  const filteredResidents = residents.filter((r) => {
    if (filter !== 'All' && r.paymentStatus !== filter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.flat.toLowerCase().includes(q);
    }
    return true;
  });

  const handleSendReminder = (id, name) => {
    addToast(`Payment reminder prepared for ${name}.`);
    updateResident(id, { reminderSent: true });
  };

  return (
    <div className="w-full min-w-0">
      
      {/* 
        FINANCIAL HERO
        Large deep navy hero, not a small card.
      */}
      <div className="bg-navy-950 w-full pt-12 pb-16 px-6 lg:px-12 relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-3xl font-light text-white tracking-tight mb-8">Society Treasury</h1>
          
          <p className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-2">Total Collection — {CURRENT_DUE.month}</p>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 mb-6">
            <span className="text-5xl sm:text-7xl font-light text-white tracking-tight">{formatCurrency(totalCollected)}</span>
            <span className="text-xl sm:text-2xl font-light text-white/40">/ {formatCurrency(totalExpected)}</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-white hover:bg-surface-100 text-navy-950 px-6 py-3 font-semibold text-sm transition-colors flex items-center gap-2">
              Generate Report <ArrowRight size={14} />
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 font-semibold text-sm transition-colors border border-white/20">
              Send Reminders
            </button>
          </div>
        </div>
      </div>

      {/* 
        KPI ROW 
        Unified financial KPI system.
      */}
      <div className="px-2 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-surface-200 border-b border-surface-200 pb-8">
          <div className="lg:pr-8">
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-1.5">Collection Rate</p>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-500" />
              <span className="text-2xl font-light text-surface-900">{collectionRate}%</span>
            </div>
            <div className="w-full h-1 bg-surface-100 mt-3">
              <div className="h-full bg-emerald-500" style={{ width: `${collectionRate}%` }} />
            </div>
          </div>
          <div className="lg:px-8">
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-1.5">Outstanding</p>
            <p className="text-2xl font-light text-amber-600">{formatCurrency(pendingCount * CURRENT_DUE.amount)}</p>
          </div>
          <div className="lg:px-8">
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-1.5">Paid Units</p>
            <p className="text-2xl font-light text-surface-900">{paidCount} <span className="text-sm text-surface-400">/ {residents.length}</span></p>
          </div>
          <div className="lg:pl-8">
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-1.5">Current Due</p>
            <p className="text-2xl font-light text-surface-900">{formatCurrency(CURRENT_DUE.amount)}</p>
          </div>
        </div>
      </div>

      {/* 
        ASYMMETRIC LAYOUT: Ledger vs Insights
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
        
        {/* MAIN: Ledger */}
        <div className="lg:col-span-8 xl:col-span-9 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-surface-900">Payment Ledger</h2>
              <p className="text-xs text-surface-500">Record of all transactions for the current period.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search unit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-2 border-b border-surface-200 bg-transparent text-sm focus:outline-none focus:border-primary-500 transition-colors placeholder:text-surface-400 w-full sm:w-48"
                />
              </div>
              <div className="flex gap-1">
                {['All', 'Paid', 'Pending'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${
                      filter === f ? 'border-primary-600 text-primary-600' : 'border-transparent text-surface-400 hover:text-surface-700'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-surface-900 text-[10px] font-bold text-surface-500 uppercase tracking-widest">
                  <th className="py-3 px-2 font-medium">Unit / Resident</th>
                  <th className="py-3 px-2 font-medium">Amount</th>
                  <th className="py-3 px-2 font-medium">Status</th>
                  <th className="py-3 px-2 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200">
                {filteredResidents.length > 0 ? (
                  filteredResidents.map((r) => (
                    <tr key={r.id} className="group hover:bg-surface-50/50 transition-colors">
                      <td className="py-4 px-2">
                        <div className="text-xs font-mono font-bold text-surface-900 mb-0.5">{r.flat}</div>
                        <div className="text-[13px] font-medium text-surface-600">{r.name}</div>
                      </td>
                      <td className="py-4 px-2 text-sm font-semibold text-surface-900">
                        {formatCurrency(CURRENT_DUE.amount)}
                        <div className="text-[10px] font-medium text-surface-400 uppercase tracking-widest mt-0.5">Due: {formatDate(CURRENT_DUE.dueDate)}</div>
                      </td>
                      <td className="py-4 px-2">
                        {r.paymentStatus === 'Paid' ? (
                          <div>
                            <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 mb-1">Paid</span>
                            <div className="text-[10px] text-surface-400">{r.paidDate ? formatDate(r.paidDate) : 'Recent'}</div>
                          </div>
                        ) : (
                          <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50">Pending</span>
                        )}
                      </td>
                      <td className="py-4 px-2 text-right">
                        {r.paymentStatus === 'Pending' ? (
                          <button
                            onClick={() => handleSendReminder(r.id, r.name)}
                            disabled={r.reminderSent}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                              r.reminderSent
                                ? 'text-surface-400 cursor-not-allowed'
                                : 'text-primary-600 hover:text-primary-700'
                            }`}
                          >
                            <Bell size={14} />
                            {r.reminderSent ? 'Sent' : 'Remind'}
                          </button>
                        ) : (
                          <span className="inline-flex items-center text-emerald-500">
                            <CheckCircle2 size={18} />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-sm text-surface-400">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: Insights / Actions */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-20 space-y-10">
            
            <div>
              <h2 className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-surface-200">Financial Insights</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-surface-900 mb-1">On-time Collection</h3>
                  <p className="text-xs text-surface-500 leading-relaxed">
                    {collectionRate}% of residents have paid before the due date. This is a 12% improvement from last month.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-surface-900 mb-1">Pending Follow-ups</h3>
                  <p className="text-xs text-surface-500 leading-relaxed">
                    You have {pendingCount} residents who have not paid. Sending bulk reminders usually recovers 40% within 48 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface-50 p-6">
              <h3 className="text-xs font-bold text-surface-900 uppercase tracking-widest mb-4">Export Data</h3>
              <div className="space-y-3">
                <button onClick={() => addToast('Export not available in demo', 'info')} className="w-full text-left text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">Download CSV</button>
                <button onClick={() => addToast('Export not available in demo', 'info')} className="w-full text-left text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">Download PDF Report</button>
                <button onClick={() => addToast('Export not available in demo', 'info')} className="w-full text-left text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">Generate Defaulters List</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
