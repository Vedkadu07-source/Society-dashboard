import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ComplaintCard } from '../components/ComplaintCard';
import ComplaintModal from '../components/ComplaintModal';
import { formatDate, generateId, todayISO, statusColor } from '../utils/helpers';
import { COMPLAINT_CATEGORIES } from '../data/mockData';
import {
  Search,
  Filter,
  Plus,
  X,
  Upload,
  Send,
  FileQuestion,
} from 'lucide-react';

export default function Complaints() {
  const { user, complaints, addComplaint, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
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
      const matchCategory = categoryFilter === 'All' || c.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [myComplaints, search, statusFilter, categoryFilter]);

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
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-surface-900 tracking-tight">Complaints</h1>
          <p className="text-surface-500 mt-2 text-lg">Track and manage your submitted complaints.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shrink-0 shadow-sm"
        >
          <Plus size={18} />
          New Complaint
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-surface-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search complaints…"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all font-medium placeholder:text-surface-400"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            aria-label="Filter by status"
          >
            <option value="All">All Status</option>
            <option>Submitted</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Rejected</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            aria-label="Filter by category"
          >
            <option value="All">All Categories</option>
            {COMPLAINT_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop table */}
      {filtered.length > 0 ? (
        <>
          {/* Table – hidden on mobile */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-surface-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 border-b border-surface-200 text-surface-500 text-left text-[11px] uppercase tracking-wider font-bold">
                    <th className="px-5 py-4">ID</th>
                    <th className="px-5 py-4">Complaint</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-surface-50 transition-colors group">
                      <td className="px-5 py-4 font-medium text-surface-500 text-xs">{c.id}</td>
                      <td className="px-5 py-4 text-surface-900 font-medium max-w-xs truncate">{c.title}</td>
                      <td className="px-5 py-4 text-surface-600">
                        <span className="bg-surface-100 border border-surface-200 px-2 py-0.5 rounded-full text-xs font-medium">{c.category}</span>
                      </td>
                      <td className="px-5 py-4 text-surface-500">{formatDate(c.date)}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide border ${
                          c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' :
                          c.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200/60' :
                          c.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200/60' :
                          'bg-amber-50 text-amber-700 border-amber-200/60'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelected(c)}
                          className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards – mobile only */}
          <div className="md:hidden space-y-3">
            {filtered.map((c) => (
              <ComplaintCard key={c.id} complaint={c} onClick={() => setSelected(c)} />
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white border border-surface-200 rounded-lg p-10 text-center">
          <FileQuestion size={40} className="text-surface-300 mx-auto mb-3" />
          <h3 className="font-medium text-surface-700 mb-1">No complaints found</h3>
          <p className="text-sm text-surface-500">
            {myComplaints.length === 0
              ? "You haven't submitted any complaints yet."
              : 'No complaints match your filters.'}
          </p>
        </div>
      )}

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) resetForm();
          }}
        >
          <div className="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-surface-200">
              <h2 className="text-xl font-bold text-surface-900 tracking-tight">Submit New Complaint</h2>
              <button onClick={resetForm} className="p-2 rounded-xl hover:bg-surface-100 text-surface-500 transition-colors" aria-label="Close">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
              {/* Title */}
              <div>
                <label htmlFor="cmp-title" className="block text-[13px] font-bold text-surface-700 uppercase tracking-wide mb-1.5">Complaint Title</label>
                <input
                  id="cmp-title"
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all ${formErrors.title ? 'border-red-400 bg-red-50' : 'border-surface-300 bg-white'}`}
                  placeholder="e.g. Water leakage in Block A"
                />
                {formErrors.title && <p className="text-xs font-bold text-red-500 mt-1.5">{formErrors.title}</p>}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="cmp-cat" className="block text-[13px] font-bold text-surface-700 uppercase tracking-wide mb-1.5">Category</label>
                <select
                  id="cmp-cat"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all ${formErrors.category ? 'border-red-400 bg-red-50' : 'border-surface-300 bg-white'}`}
                >
                  <option value="">Select category</option>
                  {COMPLAINT_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                {formErrors.category && <p className="text-xs font-bold text-red-500 mt-1.5">{formErrors.category}</p>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="cmp-desc" className="block text-[13px] font-bold text-surface-700 uppercase tracking-wide mb-1.5">Description</label>
                <textarea
                  id="cmp-desc"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none ${formErrors.description ? 'border-red-400 bg-red-50' : 'border-surface-300 bg-white'}`}
                  placeholder="Describe the issue in detail…"
                />
                {formErrors.description && <p className="text-xs font-bold text-red-500 mt-1.5">{formErrors.description}</p>}
              </div>

              {/* Location + Flat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="cmp-loc" className="block text-[13px] font-bold text-surface-700 uppercase tracking-wide mb-1.5">Location / Block</label>
                  <input
                    id="cmp-loc"
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all ${formErrors.location ? 'border-red-400 bg-red-50' : 'border-surface-300 bg-white'}`}
                    placeholder="Block A"
                  />
                  {formErrors.location && <p className="text-xs font-bold text-red-500 mt-1.5">{formErrors.location}</p>}
                </div>
                <div>
                  <label htmlFor="cmp-flat" className="block text-[13px] font-bold text-surface-700 uppercase tracking-wide mb-1.5">Flat Number</label>
                  <input
                    id="cmp-flat"
                    type="text"
                    value={form.flat}
                    onChange={(e) => setForm({ ...form, flat: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-white"
                    placeholder="A-204"
                  />
                </div>
              </div>

              {/* File upload */}
              <div>
                <label className="block text-[13px] font-bold text-surface-700 uppercase tracking-wide mb-1.5">Attachment (optional)</label>
                <label
                  htmlFor="cmp-file"
                  className="flex items-center gap-3 px-4 py-4 rounded-xl border-2 border-dashed border-surface-300 cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all text-sm text-surface-500"
                >
                  <Upload size={18} className="text-surface-400" />
                  {form.file ? (
                    <span className="text-surface-900 font-bold">{form.file.name}</span>
                  ) : (
                    <span className="font-medium text-surface-500">Click to upload an image</span>
                  )}
                  <input
                    id="cmp-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })}
                  />
                </label>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-4 border-t border-surface-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 text-sm font-bold text-surface-600 hover:bg-surface-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  <Send size={16} />
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail modal */}
      <ComplaintModal open={!!selected} onClose={() => setSelected(null)} complaint={selected} />
    </div>
  );
}
