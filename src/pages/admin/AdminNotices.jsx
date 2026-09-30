import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2, CalendarClock, AlertCircle, Bell, ArrowRight } from 'lucide-react';
import Modal from '../../components/Modal';
import { formatDate } from '../../utils/helpers';

const CATEGORIES = ['General', 'Maintenance', 'Meeting', 'Emergency', 'Event'];

export default function AdminNotices() {
  const { notices, addNotice, deleteNotice, addToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    important: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    const newNotice = {
      id: `NOT-${Date.now().toString().slice(-4)}`,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      important: formData.important,
      date: new Date().toISOString().split('T')[0],
      createdBy: 'Committee',
    };

    addNotice(newNotice);
    addToast('Notice created successfully.', 'success');
    setIsModalOpen(false);
    setFormData({ title: '', description: '', category: 'General', important: false });
  };

  const confirmDelete = (id) => {
    deleteNotice(id);
    addToast('Notice deleted.', 'success');
    setDeleteConfirm(null);
  };

  const importantCount = notices.filter(n => n.important).length;

  return (
    <div className="w-full min-w-0">
      
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-200 pb-6 mb-12">
        <div>
          <h1 className="text-3xl font-light text-surface-900 tracking-tight mb-2">Notice Board</h1>
          <p className="text-sm text-surface-500 max-w-md">Broadcast announcements and important updates to all residents.</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-6 text-sm pr-6 border-r border-surface-200">
            <div>
              <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-0.5">Total</p>
              <p className="text-xl font-light text-surface-900 tracking-tight">{notices.length}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-0.5">Urgent</p>
              <p className="text-xl font-light text-red-600 tracking-tight">{importantCount}</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
          >
            <Plus size={14} /> New Notice
          </button>
        </div>
      </div>

      {/* EDITORIAL LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
        
        <div className="lg:col-span-8 xl:col-span-9 min-w-0">
          {notices.length > 0 ? (
            <div className="space-y-12">
              {notices.map((n) => (
                <div key={n.id} className="group relative">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">
                      {formatDate(n.date)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-surface-300" />
                    <span className="text-xs font-bold text-surface-500 uppercase tracking-widest">
                      {n.category}
                    </span>
                    {n.important && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-surface-300" />
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded uppercase tracking-widest">
                          <AlertCircle size={10} /> Urgent
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <h3 className="text-2xl font-semibold text-surface-900 leading-snug mb-3">
                        {n.title}
                      </h3>
                      <p className="text-sm text-surface-600 leading-relaxed max-w-3xl whitespace-pre-wrap">
                        {n.description}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setDeleteConfirm(n.id)}
                      className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-2 text-surface-300 hover:text-red-600 transition-colors shrink-0"
                      title="Delete Notice"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Bell size={48} className="text-surface-200 mx-auto mb-6" />
              <h3 className="text-xl font-light text-surface-900 mb-2">No notices created</h3>
              <p className="text-sm text-surface-500 max-w-sm mx-auto">
                Create your first notice to broadcast announcements.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-20">
            <h2 className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-surface-200">Guidelines</h2>
            <div className="space-y-6 text-sm text-surface-500">
              <p>Keep titles concise and descriptive.</p>
              <p>Only mark notices as <strong>Urgent</strong> for emergencies, sudden water/power cuts, or critical security updates.</p>
              <p>Notices are immediately visible on the resident dashboard upon publishing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Publish Notice">
        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div>
            <label className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-1.5">Headline</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border-b font-medium text-sm focus:outline-none transition-colors border-surface-200 bg-transparent focus:border-primary-500"
              placeholder="e.g. Annual General Meeting Scheduled"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-1.5">Category</label>
              <select
                className="w-full px-3 py-2 border-b font-medium text-sm focus:outline-none transition-colors border-surface-200 bg-transparent focus:border-primary-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 rounded border-surface-300 focus:ring-primary-500 transition-colors"
                  checked={formData.important}
                  onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
                />
                <span className="text-xs font-bold uppercase tracking-widest text-surface-500 group-hover:text-surface-900 transition-colors">Mark Urgent</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-1.5">Content</label>
            <textarea
              required
              rows={5}
              className="w-full px-3 py-2 border font-medium text-sm focus:outline-none resize-none transition-colors border-surface-200 bg-transparent focus:border-primary-500"
              placeholder="Enter the full announcement details here..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-surface-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="text-xs font-bold text-surface-500 uppercase tracking-widest hover:text-surface-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 transition-colors flex items-center gap-2"
            >
              Publish <ArrowRight size={14} />
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Notice?">
        <div className="mt-3 py-4">
          <p className="text-sm font-medium text-surface-700 mb-6">Are you sure you want to delete this notice? This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <button onClick={() => setDeleteConfirm(null)} className="text-xs font-bold text-surface-500 uppercase tracking-widest hover:text-surface-900 transition-colors">Cancel</button>
            <button onClick={() => confirmDelete(deleteConfirm)} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 transition-colors">Confirm Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
