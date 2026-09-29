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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">My Complaints</h1>
          <p className="text-surface-500 mt-0.5">Track and manage your submitted complaints.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shrink-0"
        >
          <Plus size={16} />
          New Complaint
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search complaints…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-surface-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-surface-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
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
            className="px-3 py-2 rounded-lg border border-surface-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
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
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-surface-200 overflow-x-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 text-surface-600 text-left">
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Complaint</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-surface-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-surface-700">{c.id}</td>
                      <td className="px-4 py-3 text-surface-800 max-w-xs truncate">{c.title}</td>
                      <td className="px-4 py-3 text-surface-600">{c.category}</td>
                      <td className="px-4 py-3 text-surface-500">{formatDate(c.date)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${statusColor(c.status)}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelected(c)}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
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

      {/* New complaint form modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) resetForm();
          }}
        >
          <div className="modal-content bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200">
              <h2 className="text-lg font-semibold text-surface-900">Submit New Complaint</h2>
              <button onClick={resetForm} className="p-1 rounded-md hover:bg-surface-100 text-surface-500" aria-label="Close">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
              {/* Title */}
              <div>
                <label htmlFor="cmp-title" className="block text-sm font-medium text-surface-700 mb-1.5">Complaint Title</label>
                <input
                  id="cmp-title"
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${formErrors.title ? 'border-red-400' : 'border-surface-300'}`}
                  placeholder="e.g. Water leakage in Block A"
                />
                {formErrors.title && <p className="text-xs text-red-500 mt-1">{formErrors.title}</p>}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="cmp-cat" className="block text-sm font-medium text-surface-700 mb-1.5">Category</label>
                <select
                  id="cmp-cat"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white ${formErrors.category ? 'border-red-400' : 'border-surface-300'}`}
                >
                  <option value="">Select category</option>
                  {COMPLAINT_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                {formErrors.category && <p className="text-xs text-red-500 mt-1">{formErrors.category}</p>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="cmp-desc" className="block text-sm font-medium text-surface-700 mb-1.5">Description</label>
                <textarea
                  id="cmp-desc"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${formErrors.description ? 'border-red-400' : 'border-surface-300'}`}
                  placeholder="Describe the issue in detail…"
                />
                {formErrors.description && <p className="text-xs text-red-500 mt-1">{formErrors.description}</p>}
              </div>

              {/* Location + Flat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cmp-loc" className="block text-sm font-medium text-surface-700 mb-1.5">Location / Block</label>
                  <input
                    id="cmp-loc"
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${formErrors.location ? 'border-red-400' : 'border-surface-300'}`}
                    placeholder="Block A"
                  />
                  {formErrors.location && <p className="text-xs text-red-500 mt-1">{formErrors.location}</p>}
                </div>
                <div>
                  <label htmlFor="cmp-flat" className="block text-sm font-medium text-surface-700 mb-1.5">Flat Number</label>
                  <input
                    id="cmp-flat"
                    type="text"
                    value={form.flat}
                    onChange={(e) => setForm({ ...form, flat: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-surface-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="A-204"
                  />
                </div>
              </div>

              {/* File upload */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Attachment (optional)</label>
                <label
                  htmlFor="cmp-file"
                  className="flex items-center gap-3 px-3.5 py-3 rounded-lg border border-dashed border-surface-300 cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition text-sm text-surface-500"
                >
                  <Upload size={18} className="text-surface-400" />
                  {form.file ? (
                    <span className="text-surface-700">{form.file.name}</span>
                  ) : (
                    <span>Click to upload an image</span>
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
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-surface-600 hover:bg-surface-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
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
