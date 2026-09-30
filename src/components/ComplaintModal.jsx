import Modal from './Modal';
import { formatDate } from '../utils/helpers';
import { MapPin, Calendar, Tag, User, Home, MessageSquare, Clock } from 'lucide-react';

export default function ComplaintModal({ open, onClose, complaint }) {
  if (!complaint) return null;

  return (
    <Modal open={open} onClose={onClose} title={`Complaint ${complaint.id}`} wide>
      <div className="space-y-6 mt-2">
        {/* Header info */}
        <div>
          <h3 className="text-xl font-bold text-surface-900 tracking-tight mb-2">{complaint.title}</h3>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${
            complaint.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' :
            complaint.status === 'Rejected' ? 'bg-red-50 text-red-700' :
            complaint.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
            'bg-amber-50 text-amber-700'
          }`}>
            {complaint.status}
          </span>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-surface-50 p-4 rounded-xl border border-surface-200/80">
          <div className="flex items-center gap-2 text-surface-600">
            <Tag size={14} className="text-surface-400 shrink-0" />
            <span className="font-medium text-surface-500 text-xs uppercase tracking-wide">Category:</span>
            <span className="font-semibold text-surface-900 ml-1">{complaint.category}</span>
          </div>
          <div className="flex items-center gap-2 text-surface-600">
            <Calendar size={14} className="text-surface-400 shrink-0" />
            <span className="font-medium text-surface-500 text-xs uppercase tracking-wide">Date:</span>
            <span className="font-semibold text-surface-900 ml-1">{formatDate(complaint.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-surface-600">
            <MapPin size={14} className="text-surface-400 shrink-0" />
            <span className="font-medium text-surface-500 text-xs uppercase tracking-wide">Location:</span>
            <span className="font-semibold text-surface-900 ml-1">{complaint.location}</span>
          </div>
          <div className="flex items-center gap-2 text-surface-600">
            <Home size={14} className="text-surface-400 shrink-0" />
            <span className="font-medium text-surface-500 text-xs uppercase tracking-wide">Unit:</span>
            <span className="font-semibold text-surface-900 font-mono text-xs ml-1 bg-white px-1.5 py-0.5 rounded border border-surface-200">{complaint.flat}</span>
          </div>
          {complaint.resident && (
            <div className="flex items-center gap-2 text-surface-600 sm:col-span-2">
              <User size={14} className="text-surface-400 shrink-0" />
              <span className="font-medium text-surface-500 text-xs uppercase tracking-wide">Resident:</span>
              <span className="font-semibold text-surface-900 ml-1">{complaint.resident}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <h4 className="text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-2">Description</h4>
          <p className="text-[13px] font-medium text-surface-700 leading-relaxed bg-white p-4 rounded-xl border border-surface-200/80 shadow-sm">{complaint.description}</p>
        </div>

        {/* Admin response */}
        {complaint.adminResponse && (
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={14} className="text-blue-600" />
              <h4 className="text-[11px] font-bold text-blue-800 uppercase tracking-widest">Admin Response</h4>
            </div>
            <p className="text-[13px] font-medium text-blue-900 leading-relaxed">{complaint.adminResponse}</p>
          </div>
        )}

        {/* Timeline */}
        {complaint.timeline && complaint.timeline.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={14} className="text-surface-400" />
              <h4 className="text-[11px] font-bold text-surface-500 uppercase tracking-widest">Timeline</h4>
            </div>
            <div className="relative pl-5 space-y-4 bg-white p-4 rounded-xl border border-surface-200/80 shadow-sm">
              <div className="absolute left-[25px] top-4 bottom-4 w-px bg-surface-200" />
              {complaint.timeline.map((entry, i) => (
                <div key={i} className="relative z-10">
                  <div className={`absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                    i === complaint.timeline.length - 1
                      ? 'bg-primary-600 border-primary-600 shadow-sm'
                      : 'bg-white border-surface-300'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-[11px] font-bold text-surface-900">{entry.status}</span>
                      <span className="text-[10px] font-medium text-surface-400">{formatDate(entry.date)}</span>
                    </div>
                    {entry.note && (
                      <p className="text-xs font-medium text-surface-500">{entry.note}</p>
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
