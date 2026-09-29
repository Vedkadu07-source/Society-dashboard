import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2, CalendarClock, AlertCircle } from 'lucide-react';
import Modal from '../../components/Modal';
import NoticeCard from '../../components/NoticeCard';

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
    addToast('Notice created successfully.');
    setIsModalOpen(false);
    setFormData({ title: '', description: '', category: 'General', important: false });
  };

  const confirmDelete = (id) => {
    deleteNotice(id);
    addToast('Notice deleted.');
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Manage Notices</h1>
          <p className="text-sm font-medium text-surface-500 mt-1">Create and broadcast announcements to all residents.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm"
        >
          <Plus size={18} />
          Create Notice
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden min-w-0">
        <div className="overflow-x-auto min-w-0 w-full">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-50 border-b border-surface-200 text-[11px] font-bold uppercase tracking-wider text-surface-500">
                <th className="px-5 py-4">Title & Category</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Importance</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {notices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-sm font-medium text-surface-500">
                    No notices created yet.
                  </td>
                </tr>
              ) : (
                notices.map((n) => (
                  <tr key={n.id} className="hover:bg-surface-50 transition-colors group">
                    <td className="px-5 py-4">
                      <p className="font-bold text-surface-900 mb-1 text-base">{n.title}</p>
                      <span className="bg-surface-100 border border-surface-200 px-2 py-0.5 rounded-full text-xs font-medium text-surface-600">{n.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1.5 text-sm font-medium text-surface-600">
                        <CalendarClock size={14} className="text-surface-400" />
                        {new Date(n.date).toLocaleDateString('en-GB')}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {n.important ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide text-red-700 bg-red-50 border border-red-200/60">
                          <AlertCircle size={14} className="text-red-500" />
                          Important
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-surface-400">Normal</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setDeleteConfirm(n.id)}
                        className="p-2 text-surface-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Delete Notice"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Notice">
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Notice title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">Category</label>
              <select
                className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-center mt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 rounded border-surface-300 focus:ring-primary-500"
                  checked={formData.important}
                  onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
                />
                <span className="text-sm font-medium text-red-600">Mark as Important</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
            <textarea
              required
              rows={4}
              className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              placeholder="Detailed notice content..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-surface-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-2 px-4 border border-surface-200 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Publish Notice
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Notice">
        <div className="mt-4">
          <p className="text-surface-600 mb-6">Are you sure you want to delete this notice? This action cannot be undone.</p>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="flex-1 py-2 px-4 border border-surface-200 text-surface-700 rounded-lg hover:bg-surface-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => confirmDelete(deleteConfirm)}
              className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
