import { AlertCircle, CalendarClock, AlertTriangle, Info, ShieldAlert, FileText, Calendar } from 'lucide-react';

const CATEGORY_ICONS = {
  General: Info,
  Maintenance: CalendarClock,
  Meeting: Calendar,
  Emergency: ShieldAlert,
  Event: FileText,
};

const CATEGORY_COLORS = {
  General: 'text-blue-600 bg-blue-50',
  Maintenance: 'text-amber-600 bg-amber-50',
  Meeting: 'text-purple-600 bg-purple-50',
  Emergency: 'text-red-600 bg-red-50',
  Event: 'text-emerald-600 bg-emerald-50',
};

export default function NoticeCard({ notice }) {
  const Icon = CATEGORY_ICONS[notice.category] || Info;
  const colors = CATEGORY_COLORS[notice.category] || CATEGORY_COLORS.General;
  const dateStr = new Date(notice.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="bg-white rounded-xl border border-surface-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-0">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`p-2 rounded-lg shrink-0 ${colors}`}>
            <Icon size={18} />
          </div>
          <h4 className="font-semibold text-surface-900 truncate">{notice.title}</h4>
        </div>
        {notice.important && (
          <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100">
            <AlertCircle size={12} />
            Important
          </span>
        )}
      </div>
      
      <p className="text-sm text-surface-600 line-clamp-2 mb-4">
        {notice.description}
      </p>
      
      <div className="flex items-center justify-between text-xs text-surface-500">
        <span className="font-medium bg-surface-100 px-2 py-1 rounded">{notice.category}</span>
        <span className="flex items-center gap-1"><CalendarClock size={12} /> {dateStr}</span>
      </div>
    </div>
  );
}
