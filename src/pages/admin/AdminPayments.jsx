import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate, statusColor } from '../../utils/helpers';
import { IndianRupee, Receipt, Bell, Search } from 'lucide-react';
import { CURRENT_DUE } from '../../data/mockData';

export default function AdminPayments() {
  const { residents, payments, addToast, updateResident } = useApp();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const totalExpected = residents.length * CURRENT_DUE.amount;
  const totalCollected = residents.filter(r => r.paymentStatus === 'Paid').length * CURRENT_DUE.amount;
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
    <div className="space-y-8 pb-10 w-full min-w-0">
      <div>
        <h1 className="text-3xl font-bold text-surface-900 tracking-tight">Maintenance Collection</h1>
        <p className="text-lg text-surface-500 mt-2">Track and manage society maintenance dues.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full min-w-0">
        <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-6 flex items-start justify-between min-w-0 group hover:shadow-md transition-all">
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-surface-500 uppercase tracking-wide mb-1 truncate">Total Expected</p>
            <p className="text-3xl font-bold text-surface-900 truncate tracking-tight">{formatCurrency(totalExpected)}</p>
          </div>
          <div className="bg-surface-100 text-surface-700 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
            <Receipt size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-6 flex items-start justify-between min-w-0 group hover:shadow-md transition-all">
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-surface-500 uppercase tracking-wide mb-1 truncate">Collected</p>
            <p className="text-3xl font-bold text-surface-900 truncate tracking-tight">{formatCurrency(totalCollected)}</p>
          </div>
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
            <IndianRupee size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-6 flex items-start justify-between min-w-0 group hover:shadow-md transition-all">
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-surface-500 uppercase tracking-wide mb-1 truncate">Pending</p>
            <p className="text-3xl font-bold text-surface-900 truncate tracking-tight">{pendingCount}</p>
          </div>
          <div className="bg-amber-50 text-amber-600 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
            <Bell size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-6 flex items-start justify-between min-w-0 group hover:shadow-md transition-all">
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-surface-500 uppercase tracking-wide mb-1 truncate">Collection Rate</p>
            <p className="text-3xl font-bold text-surface-900 truncate tracking-tight">{collectionRate}%</p>
          </div>
          <div className="bg-primary-50 text-primary-700 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
            <IndianRupee size={24} />
          </div>
        </div>
      </div>

      {/* Member Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-surface-200 overflow-hidden min-w-0">
        <div className="p-4 border-b border-surface-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface-50">
          <div className="relative w-full sm:w-72">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search resident or flat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm font-medium transition-all bg-white"
            />
          </div>
          
          <div className="flex gap-2 p-1 bg-surface-100/50 rounded-xl border border-surface-200/50">
            {['All', 'Paid', 'Pending'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  filter === f
                    ? 'bg-white text-surface-900 shadow-sm border border-surface-200'
                    : 'text-surface-500 hover:text-surface-700 hover:bg-surface-100/50 border border-transparent'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto w-full min-w-0">
          <table className="w-full text-sm text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-50 border-b border-surface-200 text-surface-500 text-[11px] uppercase tracking-wider font-bold">
                <th className="px-5 py-4">Resident</th>
                <th className="px-5 py-4">Flat</th>
                <th className="px-5 py-4">Monthly Fee</th>
                <th className="px-5 py-4">Due Date</th>
                <th className="px-5 py-4">Payment Status</th>
                <th className="px-5 py-4">Payment Date</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filteredResidents.length > 0 ? (
                filteredResidents.map((r) => (
                  <tr key={r.id} className="hover:bg-surface-50 transition-colors group">
                    <td className="px-5 py-4 font-bold text-surface-900">{r.name}</td>
                    <td className="px-5 py-4 text-surface-500">
                      <span className="bg-surface-100 border border-surface-200 px-2 py-0.5 rounded-md font-mono text-xs font-bold">{r.flat}</span>
                    </td>
                    <td className="px-5 py-4 font-medium text-surface-700">{formatCurrency(CURRENT_DUE.amount)}</td>
                    <td className="px-5 py-4 text-surface-500 font-medium">{formatDate(CURRENT_DUE.dueDate)}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide border ${r.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' : 'bg-amber-50 text-amber-700 border-amber-200/60'}`}>
                        {r.paymentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-surface-500 text-xs">
                      {r.paymentStatus === 'Paid' ? (
                        <>
                          <div className="font-bold">{r.paidDate ? formatDate(r.paidDate) : 'Recent'}</div>
                          {r.transactionId && <div className="text-[10px] font-mono mt-0.5 text-surface-400">{r.transactionId}</div>}
                        </>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {r.paymentStatus === 'Pending' && (
                        <button
                          onClick={() => handleSendReminder(r.id, r.name)}
                          disabled={r.reminderSent}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors ${
                            r.reminderSent
                              ? 'bg-surface-100 text-surface-400 cursor-not-allowed opacity-100'
                              : 'bg-primary-50 text-primary-700 hover:bg-primary-100 opacity-0 group-hover:opacity-100 focus:opacity-100'
                          }`}
                        >
                          <Bell size={14} />
                          {r.reminderSent ? 'Sent' : 'Remind'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-sm font-medium text-surface-500">
                    No residents found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-surface-200 bg-surface-50 text-[11px] font-bold uppercase tracking-wider text-surface-400 text-center">
          {filteredResidents.length} {filteredResidents.length === 1 ? 'record' : 'records'} found
        </div>
      </div>
    </div>
  );
}
