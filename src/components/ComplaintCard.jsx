import { statusColor, formatDate } from '../utils/helpers';

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${statusColor(status)}`}>
      {status}
    </span>
  );
}

export function ComplaintCard({ complaint, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-white rounded-xl border border-surface-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-primary-200 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-medium text-surface-900 group-hover:text-primary-600 transition-colors line-clamp-1">
          {complaint.title}
        </h4>
        <StatusBadge status={complaint.status} />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-surface-500">
        <span>{complaint.id}</span>
        <span>{complaint.category}</span>
        <span>{formatDate(complaint.date)}</span>
      </div>
      {complaint.description && (
        <p className="text-sm text-surface-500 mt-2 line-clamp-2">{complaint.description}</p>
      )}
    </button>
  );
}
