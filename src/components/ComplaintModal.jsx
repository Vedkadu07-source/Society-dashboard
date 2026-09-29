import Modal from './Modal';
import StatusBadge from './ComplaintCard';
import { formatDate } from '../utils/helpers';
import { MapPin, Calendar, Tag, User, Home, MessageSquare, Clock } from 'lucide-react';

export default function ComplaintModal({ open, onClose, complaint }) {
  if (!complaint) return null;

  return (
    <Modal open={open} onClose={onClose} title={`Complaint ${complaint.id}`} wide>
      <div className="space-y-5">
        {/* Header info */}
        <div>
          <h3 className="text-lg font-semibold text-surface-900 mb-2">{complaint.title}</h3>
          <StatusBadge status={complaint.status} />
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-surface-600">
            <Tag size={15} className="text-surface-400 shrink-0" />
            <span className="font-medium">Category:</span>
            <span>{complaint.category}</span>
          </div>
          <div className="flex items-center gap-2 text-surface-600">
            <Calendar size={15} className="text-surface-400 shrink-0" />
            <span className="font-medium">Date:</span>
            <span>{formatDate(complaint.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-surface-600">
            <MapPin size={15} className="text-surface-400 shrink-0" />
            <span className="font-medium">Location:</span>
            <span>{complaint.location}</span>
          </div>
          <div className="flex items-center gap-2 text-surface-600">
            <Home size={15} className="text-surface-400 shrink-0" />
            <span className="font-medium">Flat:</span>
            <span>{complaint.flat}</span>
          </div>
          {complaint.resident && (
            <div className="flex items-center gap-2 text-surface-600">
              <User size={15} className="text-surface-400 shrink-0" />
              <span className="font-medium">Resident:</span>
              <span>{complaint.resident}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <h4 className="text-sm font-semibold text-surface-700 mb-1">Description</h4>
          <p className="text-sm text-surface-600 leading-relaxed">{complaint.description}</p>
        </div>

        {/* Admin response */}
        {complaint.adminResponse && (
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={15} className="text-primary-600" />
              <h4 className="text-sm font-semibold text-primary-800">Admin Response</h4>
            </div>
            <p className="text-sm text-primary-700 leading-relaxed">{complaint.adminResponse}</p>
          </div>
        )}

        {/* Timeline */}
        {complaint.timeline && complaint.timeline.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={15} className="text-surface-500" />
              <h4 className="text-sm font-semibold text-surface-700">Timeline</h4>
            </div>
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-[9px] top-1 bottom-1 w-px bg-surface-200" />
              {complaint.timeline.map((entry, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-6 top-1 w-[18px] h-[18px] rounded-full border-2 ${
                    i === complaint.timeline.length - 1
                      ? 'bg-primary-600 border-primary-600'
                      : 'bg-white border-surface-300'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <StatusBadge status={entry.status} />
                      <span className="text-xs text-surface-400">{formatDate(entry.date)}</span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-surface-500 mt-1">{entry.note}</p>
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
