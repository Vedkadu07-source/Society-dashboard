import { useApp } from '../../context/AppContext';
import { statusColor } from '../../utils/helpers';
import { FileQuestion } from 'lucide-react';

export default function AdminResidents() {
  const { residents } = useApp();

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-surface-900 tracking-tight">Residents</h1>
        <p className="text-lg text-surface-500 mt-2">View registered society residents.</p>
      </div>

      {residents.length > 0 ? (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-surface-200 overflow-hidden">
            <div className="overflow-x-auto w-full min-w-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 border-b border-surface-200 text-surface-500 text-left text-[11px] uppercase tracking-wider font-bold">
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Flat</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Phone</th>
                    <th className="px-5 py-4">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {residents.map((r) => (
                    <tr key={r.id} className="hover:bg-surface-50 transition-colors group">
                      <td className="px-5 py-4 font-bold text-surface-900">{r.name}</td>
                      <td className="px-5 py-4 text-surface-500">
                        <span className="bg-surface-100 border border-surface-200 px-2 py-0.5 rounded-md font-mono text-xs font-bold">{r.flat}</span>
                      </td>
                      <td className="px-5 py-4 font-medium text-surface-600">{r.email}</td>
                      <td className="px-5 py-4 text-surface-500 font-mono text-xs">{r.phone}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide border ${r.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' : 'bg-amber-50 text-amber-700 border-amber-200/60'}`}>
                          {r.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {residents.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl shadow-sm border border-surface-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-surface-900">{r.name}</p>
                    <span className="bg-surface-100 border border-surface-200 px-2 py-0.5 rounded-md font-mono text-xs font-bold mt-1 inline-block text-surface-600">Flat: {r.flat}</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide border ${r.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' : 'bg-amber-50 text-amber-700 border-amber-200/60'}`}>
                    {r.paymentStatus}
                  </span>
                </div>
                <div className="space-y-1.5 text-sm font-medium text-surface-500">
                  <p>{r.email}</p>
                  <p className="font-mono text-xs">{r.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white border border-surface-200 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-surface-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-surface-100">
            <FileQuestion size={32} className="text-surface-400" />
          </div>
          <h3 className="font-bold text-surface-900 mb-2 text-lg">No residents found</h3>
          <p className="text-surface-500 max-w-sm mx-auto">Registered residents will appear here.</p>
        </div>
      )}
    </div>
  );
}
