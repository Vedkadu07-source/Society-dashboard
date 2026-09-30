import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import ComplaintModal from '../components/ComplaintModal';
import Modal from '../components/Modal';
import { formatDate, generateId, todayISO } from '../utils/helpers';
import { COMPLAINT_CATEGORIES } from '../data/mockData';
import {
  Search,
  Plus,
  X,
  Upload,
  ArrowRight,
  FileQuestion,
  Eye,
  MessageSquare
} from 'lucide-react';

export default function Complaints() {
  const { user, complaints, addComplaint, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: '', category: '', description: '', location: '', flat: user?.flat || '', file: null,
  });
  const [formErrors, setFormErrors] = useState({});

  const myComplaints = complaints.filter(
    (c) => c.residentId === user?.id || c.resident === user?.name,
  );

  const filtered = useMemo(() => {
    return myComplaints.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [myComplaints, search, statusFilter]);

  const openCount = myComplaints.filter(c => c.status === 'Submitted' || c.status === 'In Progress').length;
  const resolvedCount = myComplaints.filter(c => c.status === 'Resolved').length;

  const resetForm = () => {
    setForm({ title: '', category: '', description: '', location: '', flat: user?.flat || '', file: null });
    setFormErrors({});
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required.';
    if (!form.category) errs.category = 'Category is required.';
    if (!form.description.trim()) errs.description = 'Description is required.';
    if (!form.location.trim()) errs.location = 'Location is required.';
    setFormErrors(errs);
    if (Object.keys(errs).length) return;

    const complaint = {
      id: generateId('CMP'),
      title: form.title,
      category: form.category,
      description: form.description,
      location: form.location,
      flat: form.flat || user?.flat || '',
      resident: user?.name,
      residentId: user?.id,
      date: todayISO(),
      status: 'Submitted',
      adminResponse: '',
      timeline: [{ status: 'Submitted', date: todayISO(), note: 'Complaint registered by resident.' }],
    };

    addComplaint(complaint);
    addToast('Complaint submitted successfully!', 'success');
    resetForm();
  };

  return (
    <div className="w-full min-w-0">
      
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-200 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-light text-surface-900 tracking-tight mb-2">Service Requests</h1>
          <p className="text-sm text-surface-500 max-w-md">Track, manage, and submit complaints to the society committee.</p>
        </div>

        {/* Compact Metric Strip */}
        <div className="flex items-center gap-6 text-sm">
          <div>
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-0.5">Total</p>
            <p className="text-2xl font-light text-surface-900 tracking-tight">{myComplaints.length}</p>
          </div>
          <div className="w-px h-8 bg-surface-200" />
          <div>
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-0.5">Active</p>
            <p className="text-2xl font-light text-amber-600 tracking-tight">{openCount}</p>
          </div>
          <div className="w-px h-8 bg-surface-200" />
          <div>
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-0.5">Resolved</p>
            <p className="text-2xl font-light text-emerald-600 tracking-tight">{resolvedCount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 mb-16">
        
        {/* MAIN COLUMN */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-8 min-w-0">
          
          {/* Filters & Actions Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative w-full max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search requests..."
                  className="w-full pl-9 pr-3 py-2 border-b border-surface-200 bg-transparent text-sm focus:outline-none focus:border-primary-500 transition-colors font-medium placeholder:text-surface-400"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-2 px-2 border-b border-surface-200 bg-transparent text-sm font-medium focus:outline-none focus:border-primary-500 transition-colors"
              >
                <option value="All">Status: All</option>
                <option>Submitted</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Rejected</option>
              </select>
            </div>
            
            {/* Quick Action */}
            <div className="shrink-0">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2"
              >
                <Plus size={14} /> Report Issue
              </button>
            </div>
          </div>

          {/* DENSE OPERATIONS TABLE */}
          {filtered.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-surface-900 text-[10px] font-bold text-surface-500 uppercase tracking-widest">
                    <th className="py-3 px-2 font-medium">ID</th>
                    <th className="py-3 px-2 font-medium">Issue</th>
                    <th className="py-3 px-2 font-medium">Date</th>
                    <th className="py-3 px-2 font-medium">Status</th>
                    <th className="py-3 px-2 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200">
                  {filtered.map((c) => (
                    <tr key={c.id} className="group hover:bg-surface-50/50 transition-colors">
                      <td className="py-3 px-2">
                        <div className="text-xs font-mono text-surface-900 mb-0.5">{c.id}</div>
                      </td>
                      <td className="py-3 px-2 max-w-[200px]">
                        <div className="text-sm font-semibold text-surface-900 truncate">{c.title}</div>
                        <div className="text-[11px] text-surface-400 truncate">{c.category}</div>
                      </td>
                      <td className="py-3 px-2 text-xs font-medium text-surface-500">{formatDate(c.date)}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                          c.status === 'Resolved' ? 'text-emerald-600 bg-emerald-50' :
                          c.status === 'Rejected' ? 'text-red-600 bg-red-50' :
                          c.status === 'In Progress' ? 'text-blue-600 bg-blue-50' :
                          'text-amber-600 bg-amber-50'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button onClick={() => setSelected(c)} className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity text-xs font-bold text-primary-600 uppercase tracking-widest inline-flex items-center gap-1">
                          View <Eye size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <FileQuestion size={32} className="text-surface-300 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-surface-700 mb-1">No requests found</h3>
              <p className="text-[13px] text-surface-400">
                {myComplaints.length === 0 ? "You haven't submitted any complaints yet." : 'No complaints match your filters.'}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Instructions */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-20">
            <h2 className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-surface-200">How it works</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-surface-900 mb-1">1. Report an Issue</h3>
                <p className="text-xs text-surface-500 leading-relaxed">
                  Provide detailed information and attach photos if applicable. The committee will review it within 24 hours.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-surface-900 mb-1">2. Track Progress</h3>
                <p className="text-xs text-surface-500 leading-relaxed">
                  Watch for status updates. 'In Progress' means maintenance staff has been assigned to your issue.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-surface-900 mb-1">3. Resolution</h3>
                <p className="text-xs text-surface-500 leading-relaxed">
                  Once resolved, you will receive a notification and can view the committee's closing remarks.
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-surface-50 p-6">
              <h3 className="text-xs font-bold text-surface-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <MessageSquare size={14} className="text-primary-600" /> Need Help?
              </h3>
              <p className="text-xs text-surface-500 mb-4">
                For urgent matters (security, fire, major leaks), please call the society office directly.
              </p>
              <button onClick={() => addToast('Calling office...', 'info')} className="text-xs font-bold text-primary-600 hover:text-primary-700 uppercase tracking-widest transition-colors flex items-center gap-1">
                Emergency Contacts <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Complaint Form Modal */}
      <Modal open={showForm} onClose={resetForm} title="Report an Issue">
        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div>
            <label htmlFor="cmp-title" className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-1.5">Issue Title</label>
            <input id="cmp-title" type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={`w-full px-3 py-2 border-b font-medium text-sm focus:outline-none transition-colors ${formErrors.title ? 'border-red-400 bg-red-50' : 'border-surface-200 bg-transparent focus:border-primary-500'}`} placeholder="e.g. Water leakage in bathroom" />
            {formErrors.title && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase">{formErrors.title}</p>}
          </div>
          
          <div>
            <label htmlFor="cmp-cat" className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-1.5">Category</label>
            <select id="cmp-cat" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={`w-full px-3 py-2 border-b font-medium text-sm focus:outline-none transition-colors ${formErrors.category ? 'border-red-400 bg-red-50' : 'border-surface-200 bg-transparent focus:border-primary-500'}`}>
              <option value="">Select category</option>
              {COMPLAINT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            {formErrors.category && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase">{formErrors.category}</p>}
          </div>
          
          <div>
            <label htmlFor="cmp-desc" className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-1.5">Description</label>
            <textarea id="cmp-desc" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`w-full px-3 py-2 border font-medium text-sm focus:outline-none resize-none transition-colors ${formErrors.description ? 'border-red-400 bg-red-50' : 'border-surface-200 bg-transparent focus:border-primary-500'}`} placeholder="Describe the issue in detail…" />
            {formErrors.description && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase">{formErrors.description}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cmp-loc" className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-1.5">Location</label>
              <input id="cmp-loc" type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={`w-full px-3 py-2 border-b font-medium text-sm focus:outline-none transition-colors ${formErrors.location ? 'border-red-400 bg-red-50' : 'border-surface-200 bg-transparent focus:border-primary-500'}`} placeholder="e.g. Master Bedroom" />
              {formErrors.location && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase">{formErrors.location}</p>}
            </div>
            <div>
              <label htmlFor="cmp-flat" className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-1.5">Unit</label>
              <input id="cmp-flat" type="text" value={form.flat} onChange={(e) => setForm({ ...form, flat: e.target.value })} className="w-full px-3 py-2 border-b border-surface-200 bg-surface-50 font-medium text-sm focus:outline-none focus:border-primary-500 transition-colors" placeholder="A-204" />
            </div>
          </div>
          
          <div>
            <label className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-1.5">Attachment (optional)</label>
            <label htmlFor="cmp-file" className="flex items-center gap-3 px-4 py-4 border-2 border-dashed border-surface-200 cursor-pointer hover:border-primary-300 hover:bg-primary-50/30 transition-all text-sm text-surface-400">
              <Upload size={16} />
              {form.file ? <span className="text-surface-900 font-semibold">{form.file.name}</span> : <span className="font-medium">Click to upload an image</span>}
              <input id="cmp-file" type="file" accept="image/*" className="hidden" onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })} />
            </label>
          </div>
          
          <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-surface-200">
            <button type="button" onClick={resetForm} className="text-xs font-bold text-surface-500 uppercase tracking-widest hover:text-surface-900 transition-colors">Cancel</button>
            <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 transition-colors">Submit Request</button>
          </div>
        </form>
      </Modal>

      <ComplaintModal open={!!selected} onClose={() => setSelected(null)} complaint={selected} />
    </div>
  );
}
