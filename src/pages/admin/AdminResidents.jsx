import { useApp } from '../../context/AppContext';
import { statusColor } from '../../utils/helpers';
import { FileQuestion } from 'lucide-react';

export default function AdminResidents() {
  const { residents } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Residents</h1>
        <p className="text-surface-500 mt-0.5">View registered society residents.</p>
      </div>

      {residents.length > 0 ? (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-lg border border-surface-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 text-surface-600 text-left">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Flat</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {residents.map((r) => (
                  <tr key={r.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-surface-800">{r.name}</td>
                    <td className="px-4 py-3 text-surface-600">{r.flat}</td>
                    <td className="px-4 py-3 text-surface-500">{r.email}</td>
                    <td className="px-4 py-3 text-surface-500">{r.phone}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${statusColor(r.paymentStatus)}`}>
                        {r.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {residents.map((r) => (
              <div key={r.id} className="bg-white rounded-lg border border-surface-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-surface-900">{r.name}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${statusColor(r.paymentStatus)}`}>
                    {r.paymentStatus}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-surface-500">
                  <p>Flat: {r.flat}</p>
                  <p>{r.email}</p>
                  <p>{r.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white border border-surface-200 rounded-lg p-10 text-center">
          <FileQuestion size={40} className="text-surface-300 mx-auto mb-3" />
          <h3 className="font-medium text-surface-700 mb-1">No residents found</h3>
          <p className="text-sm text-surface-500">Registered residents will appear here.</p>
        </div>
      )}
    </div>
  );
}
