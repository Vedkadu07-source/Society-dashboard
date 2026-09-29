import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import ComplaintModal from '../../components/ComplaintModal';
import Modal from '../../components/Modal';
import { formatDate, statusColor, todayISO } from '../../utils/helpers';
import { COMPLAINT_CATEGORIES } from '../../data/mockData';
import {
  Search,
  Eye,
  MessageSquare,
  RefreshCw,
  Trash2,
  AlertTriangle,
  FileQuestion,
} from 'lucide-react';

const STATUSES = ['Submitted', 'In Progress', 'Resolved', 'Rejected'];

export default function AdminComplaints() {
  const { complaints, updateComplaint, deleteComplaint, addToast } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modals
  const [viewing, setViewing] = useState(null);
  const [responding, setResponding] = useState(null);
  const [changingStatus, setChangingStatus] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Response form
  const [response, setResponse] = useState('');
  // Status change
  const [newStatus, setNewStatus] = useState('');

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase()) ||
        c.resident?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchCategory = categoryFilter === 'All' || c.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [complaints, search, statusFilter, categoryFilter]);

  const handleSendResponse = () => {
    if (!response.trim()) {
      addToast('Please enter a response.', 'error');
      return;
    }
    updateComplaint(responding.id, { adminResponse: response });
    addToast('Response submitted successfully.', 'success');
    setResponse('');
    setResponding(null);
  };

  const handleStatusChange = () => {
    if (!newStatus) return;
    const timeline = [...(changingStatus.timeline || [])];
    timeline.push({
      status: newStatus,
      date: todayISO(),
      note: `Status changed to ${newStatus} by admin.`,
    });
    updateComplaint(changingStatus.id, { status: newStatus, timeline });
    addToast(`Status updated to "${newStatus}".`, 'success');
    setNewStatus('');
    setChangingStatus(null);
  };

  const handleDelete = () => {
    deleteComplaint(deleting.id);
    addToast('Complaint deleted.', 'success');
    setDeleting(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Manage Complaints</h1>
        <p className="text-surface-500 mt-0.5">Review, respond, and manage all society complaints.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, title, or resident…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-surface-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-surface-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          aria-label="Filter by status"
        >
          <option value="All">All Status</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-surface-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          aria-label="Filter by category"
        >
          <option value="All">All Categories</option>
          {COMPLAINT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <>
          <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-surface-200 overflow-x-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 text-surface-600 text-left">
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Resident</th>
                    <th className="px-4 py-3 font-medium">Flat</th>
                    <th className="px-4 py-3 font-medium">Complaint</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-surface-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-surface-700">{c.id}</td>
                      <td className="px-4 py-3 text-surface-700">{c.resident}</td>
                      <td className="px-4 py-3 text-surface-500">{c.flat}</td>
                      <td className="px-4 py-3 text-surface-800 max-w-[200px] truncate">{c.title}</td>
                      <td className="px-4 py-3 text-surface-600">{c.category}</td>
                      <td className="px-4 py-3 text-surface-500">{formatDate(c.date)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${statusColor(c.status)}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setViewing(c)} className="p-1.5 rounded hover:bg-surface-100 text-surface-500 hover:text-primary-600 transition-colors" title="View" aria-label="View complaint">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => { setResponding(c); setResponse(c.adminResponse || ''); }} className="p-1.5 rounded hover:bg-surface-100 text-surface-500 hover:text-blue-600 transition-colors" title="Respond" aria-label="Respond to complaint">
                            <MessageSquare size={16} />
                          </button>
                          <button onClick={() => { setChangingStatus(c); setNewStatus(c.status); }} className="p-1.5 rounded hover:bg-surface-100 text-surface-500 hover:text-amber-600 transition-colors" title="Change Status" aria-label="Change status">
                            <RefreshCw size={16} />
                          </button>
                          <button onClick={() => setDeleting(c)} className="p-1.5 rounded hover:bg-surface-100 text-surface-500 hover:text-red-600 transition-colors" title="Delete" aria-label="Delete complaint">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-3">
            {filtered.map((c) => (
              <div key={c.id} className="bg-white rounded-xl shadow-sm border border-surface-200 p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-surface-900">{c.title}</p>
                    <p className="text-xs text-surface-500 mt-0.5">{c.id} · {c.resident} · {c.flat}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium shrink-0 ${statusColor(c.status)}`}>
                    {c.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-surface-500">
                  <span>{c.category}</span>
                  <span>·</span>
                  <span>{formatDate(c.date)}</span>
                </div>
                <div className="flex items-center gap-1 pt-1 border-t border-surface-100">
                  <button onClick={() => setViewing(c)} className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium py-1 px-2 rounded hover:bg-primary-50 transition">
                    <Eye size={14} /> View
                  </button>
                  <button onClick={() => { setResponding(c); setResponse(c.adminResponse || ''); }} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium py-1 px-2 rounded hover:bg-blue-50 transition">
                    <MessageSquare size={14} /> Respond
                  </button>
                  <button onClick={() => { setChangingStatus(c); setNewStatus(c.status); }} className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-medium py-1 px-2 rounded hover:bg-amber-50 transition">
                    <RefreshCw size={14} /> Status
                  </button>
                  <button onClick={() => setDeleting(c)} className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium py-1 px-2 rounded hover:bg-red-50 transition ml-auto">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white border border-surface-200 rounded-lg p-10 text-center">
          <FileQuestion size={40} className="text-surface-300 mx-auto mb-3" />
          <h3 className="font-medium text-surface-700 mb-1">No complaints found</h3>
          <p className="text-sm text-surface-500">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* View modal */}
      <ComplaintModal open={!!viewing} onClose={() => setViewing(null)} complaint={viewing} />

      {/* Respond modal */}
      <Modal open={!!responding} onClose={() => setResponding(null)} title="Admin Response">
        {responding && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-surface-500 mb-1">{responding.id} — {responding.title}</p>
              <p className="text-xs text-surface-400">Resident: {responding.resident} · Flat: {responding.flat}</p>
            </div>
            <div>
              <label htmlFor="admin-response" className="block text-sm font-medium text-surface-700 mb-1.5">Your Response</label>
              <textarea
                id="admin-response"
                rows={4}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-surface-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                placeholder="Enter your response to the resident…"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setResponding(null)} className="px-4 py-2 text-sm font-medium text-surface-600 hover:bg-surface-100 rounded-lg transition">
                Cancel
              </button>
              <button onClick={handleSendResponse} className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                Send Response
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Change status modal */}
      <Modal open={!!changingStatus} onClose={() => setChangingStatus(null)} title="Change Status">
        {changingStatus && (
          <div className="space-y-4">
            <p className="text-sm text-surface-500">{changingStatus.id} — {changingStatus.title}</p>
            <div>
              <label htmlFor="status-select" className="block text-sm font-medium text-surface-700 mb-1.5">New Status</label>
              <select
                id="status-select"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-surface-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setChangingStatus(null)} className="px-4 py-2 text-sm font-medium text-surface-600 hover:bg-surface-100 rounded-lg transition">
                Cancel
              </button>
              <button onClick={handleStatusChange} className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                Update Status
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete confirmation */}
      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Delete Complaint?">
        {deleting && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-red-50 p-2 rounded-lg shrink-0">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm text-surface-700">
                  Are you sure you want to permanently remove this complaint?
                </p>
                <p className="text-xs text-surface-500 mt-1">{deleting.id} — {deleting.title}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleting(null)} className="px-4 py-2 text-sm font-medium text-surface-600 hover:bg-surface-100 rounded-lg transition">
                Cancel
              </button>
              <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
