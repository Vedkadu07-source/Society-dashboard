import { statusColor, formatDate } from '../utils/helpers';
import { Tag, Clock } from 'lucide-react';

export default function StatusBadge({ status }) {
  // Map our generic classes to nice SaaS pills
  let colors = 'bg-surface-100 text-surface-600 border-surface-200';
  if (status === 'Pending') colors = 'bg-amber-50 text-amber-700 border-amber-200/60';
  if (status === 'In Progress') colors = 'bg-blue-50 text-blue-700 border-blue-200/60';
  if (status === 'Resolved') colors = 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
  if (status === 'Rejected') colors = 'bg-red-50 text-red-700 border-red-200/60';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase border ${colors}`}>
      {status}
    </span>
  );
}

export function ComplaintCard({ complaint, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full min-w-0 text-left bg-white rounded-xl border border-surface-200 p-5 shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-primary-500/50"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <StatusBadge status={complaint.status} />
        <span className="text-[11px] font-medium text-surface-400 bg-surface-50 px-2 py-0.5 rounded-full border border-surface-100">
          {complaint.id}
        </span>
      </div>
      
      <h4 className="font-bold text-surface-900 group-hover:text-primary-600 transition-colors line-clamp-1 mb-1.5 text-base">
        {complaint.title}
      </h4>
      
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-surface-500 mb-3 font-medium">
        <span className="flex items-center gap-1"><Tag size={13} className="text-surface-400"/> {complaint.category}</span>
        <span className="flex items-center gap-1"><Clock size={13} className="text-surface-400"/> {formatDate(complaint.date)}</span>
      </div>
      
      {complaint.description && (
        <p className="text-sm text-surface-600 line-clamp-2 leading-relaxed">{complaint.description}</p>
      )}
    </button>
  );
}
