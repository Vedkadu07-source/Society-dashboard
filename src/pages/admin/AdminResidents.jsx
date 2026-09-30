import { useApp } from '../../context/AppContext';
import { Search, Users, ShieldCheck, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

export default function AdminResidents() {
  const { residents } = useApp();
  const [search, setSearch] = useState('');

  const paidCount = residents.filter(r => r.paymentStatus === 'Paid').length;
  const pendingCount = residents.filter(r => r.paymentStatus === 'Pending').length;
  const committeeCount = residents.filter(r => r.role === 'committee').length;

  const filtered = residents.filter(r => {
    if (!search) return true;
    const q = search.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.flat.toLowerCase().includes(q) || r.email.toLowerCase().includes(q);
  });

  return (
    <div className="w-full min-w-0">
      
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-200 pb-6 mb-12">
        <div>
          <h1 className="text-3xl font-light text-surface-900 tracking-tight mb-2">Resident Directory</h1>
          <p className="text-sm text-surface-500 max-w-md">Complete registry of all society members and their units.</p>
        </div>

        {/* Compact Metric Strip */}
        <div className="flex items-center gap-6 text-sm">
          <div>
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-0.5">Total Units</p>
            <p className="text-2xl font-light text-surface-900 tracking-tight">{residents.length}</p>
          </div>
          <div className="w-px h-8 bg-surface-200" />
          <div>
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-0.5">Paid</p>
            <p className="text-2xl font-light text-emerald-600 tracking-tight">{paidCount}</p>
          </div>
          <div className="w-px h-8 bg-surface-200" />
          <div>
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-0.5">Pending</p>
            <p className="text-2xl font-light text-amber-600 tracking-tight">{pendingCount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
        
        {/* MAIN COLUMN */}
        <div className="lg:col-span-8 xl:col-span-9 min-w-0">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="relative w-full max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                type="text"
                placeholder="Search by name, unit, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border-b border-surface-200 bg-transparent text-sm focus:outline-none focus:border-primary-500 transition-colors placeholder:text-surface-400"
              />
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            {filtered.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-surface-900 text-[10px] font-bold text-surface-500 uppercase tracking-widest">
                    <th className="py-3 px-2 font-medium">Resident Details</th>
                    <th className="py-3 px-2 font-medium">Contact</th>
                    <th className="py-3 px-2 font-medium">Payment Status</th>
                    <th className="py-3 px-2 font-medium">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200">
                  {filtered.map((r) => (
                    <tr key={r.id} className="group hover:bg-surface-50/50 transition-colors">
                      <td className="py-4 px-2">
                        <div className="text-xs font-mono font-bold text-surface-900 mb-0.5">{r.flat}</div>
                        <div className="text-[13px] font-medium text-surface-600">{r.name}</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2 text-[11px] text-surface-500 mb-1">
                          <Mail size={10} className="shrink-0" /> <span className="truncate">{r.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-surface-500 font-mono">
                          <Phone size={10} className="shrink-0" /> {r.phone}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${r.paymentStatus === 'Paid' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>
                          {r.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        {r.role === 'committee' ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary-700 bg-primary-50">
                            <ShieldCheck size={10} /> Committee
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-surface-400">Resident</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-12 text-center text-sm text-surface-400">
                <Users size={32} className="text-surface-300 mx-auto mb-3" />
                No residents found matching your search.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-20">
            <h2 className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-surface-200">Management</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-surface-900 mb-1">Committee Members</h3>
                <p className="text-xs text-surface-500 leading-relaxed">
                  There are currently {committeeCount} users with committee access privileges. They can manage complaints, notices, and treasury.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-surface-900 mb-1">Add New Resident</h3>
                <p className="text-xs text-surface-500 leading-relaxed">
                  To add a new resident, use the bulk import tool or send an invitation link to their email address.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-surface-50 p-6">
              <h3 className="text-xs font-bold text-surface-900 uppercase tracking-widest mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">Export Directory</button>
                <button className="w-full text-left text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">Generate Broadcast List</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
