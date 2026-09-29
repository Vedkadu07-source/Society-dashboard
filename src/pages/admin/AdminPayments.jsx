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
    <div className="space-y-6 w-full min-w-0">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Maintenance Collection</h1>
        <p className="text-surface-500 mt-0.5">Track and manage society maintenance dues.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full min-w-0">
        <div className="bg-white rounded-xl shadow-sm border border-surface-200 p-5 flex items-start gap-4">
          <div className="bg-blue-50 text-blue-600 p-3 rounded-lg shrink-0">
            <Receipt size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-surface-500 mb-1 truncate">Total Expected</p>
            <p className="text-xl font-semibold text-surface-900">{formatCurrency(totalExpected)}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-surface-200 p-5 flex items-start gap-4">
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg shrink-0">
            <IndianRupee size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-surface-500 mb-1 truncate">Collected</p>
            <p className="text-xl font-semibold text-surface-900">{formatCurrency(totalCollected)}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-surface-200 p-5 flex items-start gap-4">
          <div className="bg-amber-50 text-amber-600 p-3 rounded-lg shrink-0">
            <Bell size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-surface-500 mb-1 truncate">Pending</p>
            <p className="text-xl font-semibold text-surface-900">{pendingCount}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-surface-200 p-5 flex items-start gap-4">
          <div className="bg-purple-50 text-purple-600 p-3 rounded-lg shrink-0">
            <IndianRupee size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-surface-500 mb-1 truncate">Collection Rate</p>
            <p className="text-xl font-semibold text-surface-900">{collectionRate}%</p>
          </div>
        </div>
      </div>

      {/* Member Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-surface-200 overflow-hidden min-w-0">
        <div className="p-4 border-b border-surface-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface-50">
          <div className="relative w-full sm:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search resident or flat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>
          
          <div className="flex gap-2">
            {['All', 'Paid', 'Pending'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-surface-600 hover:bg-surface-100'
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
              <tr className="bg-surface-50 text-surface-600 border-b border-surface-200">
                <th className="px-4 py-3 font-medium">Resident</th>
                <th className="px-4 py-3 font-medium">Flat</th>
                <th className="px-4 py-3 font-medium">Monthly Fee</th>
                <th className="px-4 py-3 font-medium">Due Date</th>
                <th className="px-4 py-3 font-medium">Payment Status</th>
                <th className="px-4 py-3 font-medium">Payment Date</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filteredResidents.length > 0 ? (
                filteredResidents.map((r) => (
                  <tr key={r.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-surface-900">{r.name}</td>
                    <td className="px-4 py-3 text-surface-600 font-mono">{r.flat}</td>
                    <td className="px-4 py-3 text-surface-700">{formatCurrency(CURRENT_DUE.amount)}</td>
                    <td className="px-4 py-3 text-surface-600">{formatDate(CURRENT_DUE.dueDate)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${r.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {r.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-surface-500 text-xs">
                      {r.paymentStatus === 'Paid' ? (
                        <>
                          <div className="font-medium">{r.paidDate ? formatDate(r.paidDate) : 'Recent'}</div>
                          {r.transactionId && <div className="text-[10px] font-mono mt-0.5">{r.transactionId}</div>}
                        </>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {r.paymentStatus === 'Pending' && (
                        <button
                          onClick={() => handleSendReminder(r.id, r.name)}
                          disabled={r.reminderSent}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            r.reminderSent
                              ? 'bg-surface-100 text-surface-400 cursor-not-allowed'
                              : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                          }`}
                        >
                          <Bell size={14} />
                          {r.reminderSent ? 'Reminder Sent' : 'Send Reminder'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-surface-500">
                    No residents found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-surface-200 bg-surface-50 text-xs text-surface-500 text-center">
          {filteredResidents.length} {filteredResidents.length === 1 ? 'record' : 'records'} found
        </div>
      </div>
    </div>
  );
}
