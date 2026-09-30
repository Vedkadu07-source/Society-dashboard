import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import ComplaintModal from '../../components/ComplaintModal';
import Modal from '../../components/Modal';
import { formatDate, todayISO } from '../../utils/helpers';
import { COMPLAINT_CATEGORIES } from '../../data/mockData';
import {
  Search,
  Eye,
  MessageSquare,
  RefreshCw,
  Trash2,
  AlertTriangle,
  FileQuestion,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

const STATUSES = ['Submitted', 'In Progress', 'Resolved', 'Rejected'];

export default function AdminComplaints() {
  const { complaints, updateComplaint, deleteComplaint, addToast } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [viewing, setViewing] = useState(null);
  const [responding, setResponding] = useState(null);
  const [changingStatus, setChangingStatus] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [response, setResponse] = useState('');
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

  const submitted = complaints.filter(c => c.status === 'Submitted').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  const recentActivity = complaints
    .filter(c => c.timeline && c.timeline.length > 0)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

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
      note: `Status changed to ${newStatus} by committee.`,
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
    <div className="w-full min-w-0">
      
      {/* 
        HEADER & COMPACT METRICS
      */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-200 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-light text-surface-900 tracking-tight mb-2">Operations Portal</h1>
          <p className="text-sm text-surface-500 max-w-md">Command center for all society service requests and complaints.</p>
        </div>

        {/* Compact Metric Strip */}
        <div className="flex items-center gap-6 text-sm">
          <div>
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-0.5">Pending</p>
            <p className="text-2xl font-light text-amber-600 tracking-tight">{submitted}</p>
          </div>
          <div className="w-px h-8 bg-surface-200" />
          <div>
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-0.5">In Progress</p>
            <p className="text-2xl font-light text-blue-600 tracking-tight">{inProgress}</p>
          </div>
          <div className="w-px h-8 bg-surface-200" />
          <div>
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-0.5">Resolved</p>
            <p className="text-2xl font-light text-emerald-600 tracking-tight">{resolved}</p>
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
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="py-2 px-2 border-b border-surface-200 bg-transparent text-sm font-medium focus:outline-none focus:border-primary-500 transition-colors hidden sm:block"
              >
                <option value="All">Category: All</option>
                {COMPLAINT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            
            {/* Quick Action */}
            <div className="shrink-0">
              <button 
                onClick={() => addToast('Batch operations not available in demo.', 'info')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 text-sm font-semibold transition-colors flex items-center gap-2"
              >
                Review Pending <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* DENSE OPERATIONS TABLE */}
          {filtered.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-surface-900 text-[10px] font-bold text-surface-500 uppercase tracking-widest">
                    <th className="py-3 px-2 font-medium">ID / Unit</th>
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
                        <div className="text-[11px] font-medium text-surface-500">{c.flat} — {c.resident}</div>
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
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setViewing(c)} className="p-1.5 text-surface-400 hover:text-surface-900 transition-colors" title="View"><Eye size={16} /></button>
                          <button onClick={() => { setResponding(c); setResponse(c.adminResponse || ''); }} className="p-1.5 text-surface-400 hover:text-primary-600 transition-colors" title="Respond"><MessageSquare size={16} /></button>
                          <button onClick={() => { setChangingStatus(c); setNewStatus(c.status); }} className="p-1.5 text-surface-400 hover:text-amber-600 transition-colors" title="Status"><RefreshCw size={16} /></button>
                          <button onClick={() => setDeleting(c)} className="p-1.5 text-surface-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={16} /></button>
                        </div>
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
              <p className="text-[13px] text-surface-400">Adjust search or filters.</p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Recent Activity */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-20">
            <h2 className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-surface-200">Recent Activity</h2>
            
            <div className="relative pl-3 border-l border-surface-200 space-y-6">
              {recentActivity.map((c) => (
                <div key={c.id} className="relative">
                  <div className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-white border-2 border-primary-500" />
                  <div className="mb-0.5 flex flex-wrap gap-2 items-center text-[10px] font-bold uppercase tracking-widest text-surface-400">
                    <span>{formatDate(c.date)}</span>
                    <span className="text-surface-300">·</span>
                    <span className="text-primary-600">{c.id}</span>
                  </div>
                  <p className="text-[13px] font-semibold text-surface-900 leading-snug">{c.title}</p>
                  <p className="text-[11px] text-surface-500 mt-1">Status changed to {c.status}</p>
                </div>
              ))}
            </div>
            
            {recentActivity.length === 0 && (
              <p className="text-[13px] text-surface-400">No recent activity.</p>
            )}
          </div>
        </div>
      </div>

      {/* FULL WIDTH BOTTOM SUMMARY */}
      <div className="bg-navy-950 p-6 lg:p-8 text-white w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-1">Operations Summary</h3>
            <p className="text-[11px] text-white/50 uppercase tracking-widest font-bold">Month to Date</p>
          </div>
          <div className="flex items-center gap-8 lg:gap-16">
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Total</p>
              <p className="text-2xl font-light">{complaints.length}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Resolved</p>
              <p className="text-2xl font-light text-emerald-400">{resolved}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Open</p>
              <p className="text-2xl font-light text-amber-400">{submitted + inProgress}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ComplaintModal open={!!viewing} onClose={() => setViewing(null)} complaint={viewing} />

      <Modal open={!!responding} onClose={() => setResponding(null)} title="Committee Response">
        {responding && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-surface-900 mb-0.5">{responding.id} — {responding.title}</p>
              <p className="text-[11px] text-surface-500 font-medium uppercase tracking-widest">Unit {responding.flat}</p>
            </div>
            <div>
              <textarea
                rows={4}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="w-full p-4 border border-surface-200 text-sm focus:outline-none focus:border-primary-500 resize-none font-medium placeholder:text-surface-300"
                placeholder="Enter response here..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setResponding(null)} className="text-xs font-bold text-surface-500 uppercase tracking-widest hover:text-surface-900 transition">Cancel</button>
              <button onClick={handleSendResponse} className="bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-2 transition-colors">Send</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!changingStatus} onClose={() => setChangingStatus(null)} title="Update Status">
        {changingStatus && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-surface-900">{changingStatus.id} — {changingStatus.title}</p>
            <div>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-3 border border-surface-200 text-sm focus:outline-none focus:border-primary-500 font-medium"
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setChangingStatus(null)} className="text-xs font-bold text-surface-500 uppercase tracking-widest hover:text-surface-900 transition">Cancel</button>
              <button onClick={handleStatusChange} className="bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-2 transition-colors">Update</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Confirm Deletion">
        {deleting && (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-surface-900 mb-2">Delete this request?</h3>
              <p className="text-sm text-surface-500">This action cannot be undone. {deleting.id} will be permanently removed.</p>
            </div>
            <div className="flex justify-center gap-4 pt-2">
              <button onClick={() => setDeleting(null)} className="text-xs font-bold text-surface-500 uppercase tracking-widest hover:text-surface-900 transition">Cancel</button>
              <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 transition-colors">Confirm Delete</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
