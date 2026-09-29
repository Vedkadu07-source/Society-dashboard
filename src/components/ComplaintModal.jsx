import Modal from './Modal';
import StatusBadge from './ComplaintCard';
import { formatDate } from '../utils/helpers';
import { MapPin, Calendar, Tag, User, Home, MessageSquare, Clock } from 'lucide-react';

export default function ComplaintModal({ open, onClose, complaint }) {
  if (!complaint) return null;

  return (
    <Modal open={open} onClose={onClose} title={`Complaint ${complaint.id}`} wide>
      <div className="space-y-6">
        {/* Header info */}
        <div>
          <h3 className="text-xl font-bold text-surface-900 tracking-tight mb-3">{complaint.title}</h3>
          <StatusBadge status={complaint.status} />
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-surface-50 p-5 rounded-2xl border border-surface-200">
          <div className="flex items-center gap-2.5 text-surface-600">
            <Tag size={16} className="text-surface-400 shrink-0" />
            <span className="font-medium text-surface-500">Category:</span>
            <span className="font-bold text-surface-900">{complaint.category}</span>
          </div>
          <div className="flex items-center gap-2.5 text-surface-600">
            <Calendar size={16} className="text-surface-400 shrink-0" />
            <span className="font-medium text-surface-500">Date:</span>
            <span className="font-bold text-surface-900">{formatDate(complaint.date)}</span>
          </div>
          <div className="flex items-center gap-2.5 text-surface-600">
            <MapPin size={16} className="text-surface-400 shrink-0" />
            <span className="font-medium text-surface-500">Location:</span>
            <span className="font-bold text-surface-900">{complaint.location}</span>
          </div>
          <div className="flex items-center gap-2.5 text-surface-600">
            <Home size={16} className="text-surface-400 shrink-0" />
            <span className="font-medium text-surface-500">Flat:</span>
            <span className="font-bold text-surface-900 font-mono text-xs">{complaint.flat}</span>
          </div>
          {complaint.resident && (
            <div className="flex items-center gap-2.5 text-surface-600 sm:col-span-2">
              <User size={16} className="text-surface-400 shrink-0" />
              <span className="font-medium text-surface-500">Resident:</span>
              <span className="font-bold text-surface-900">{complaint.resident}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <h4 className="text-[13px] font-bold text-surface-700 uppercase tracking-wide mb-2">Description</h4>
          <p className="text-sm font-medium text-surface-600 leading-relaxed bg-white p-5 rounded-2xl border border-surface-200 shadow-sm">{complaint.description}</p>
        </div>

        {/* Admin response */}
        {complaint.adminResponse && (
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={16} className="text-blue-600" />
              <h4 className="text-[13px] font-bold text-blue-800 uppercase tracking-wide">Admin Response</h4>
            </div>
            <p className="text-sm font-medium text-blue-900 leading-relaxed">{complaint.adminResponse}</p>
          </div>
        )}

        {/* Timeline */}
        {complaint.timeline && complaint.timeline.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-surface-400" />
              <h4 className="text-[13px] font-bold text-surface-700 uppercase tracking-wide">Timeline</h4>
            </div>
            <div className="relative pl-6 space-y-5 bg-white p-5 rounded-2xl border border-surface-200 shadow-sm">
              <div className="absolute left-[29px] top-5 bottom-5 w-px bg-surface-200" />
              {complaint.timeline.map((entry, i) => (
                <div key={i} className="relative z-10">
                  <div className={`absolute -left-6 top-1 w-[18px] h-[18px] rounded-full border-2 ${
                    i === complaint.timeline.length - 1
                      ? 'bg-primary-600 border-primary-600 shadow-sm'
                      : 'bg-white border-surface-300'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <StatusBadge status={entry.status} />
                      <span className="text-xs font-bold text-surface-400 uppercase tracking-wider">{formatDate(entry.date)}</span>
                    </div>
                    {entry.note && (
                      <p className="text-sm font-medium text-surface-600 mt-2">{entry.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
