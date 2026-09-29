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
    <div className={`bg-white rounded-xl border p-5 transition-all duration-200 min-w-0 ${notice.important ? 'border-red-200 shadow-[0_2px_10px_-3px_rgba(239,68,68,0.1)] hover:border-red-300' : 'border-surface-200 shadow-sm hover:shadow-md hover:border-primary-300'}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`p-2.5 rounded-xl shrink-0 ${colors}`}>
            <Icon size={18} />
          </div>
          <h4 className="font-bold text-surface-900 truncate text-base">{notice.title}</h4>
        </div>
        {notice.important && (
          <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide text-red-700 bg-red-50 border border-red-200/60">
            <AlertCircle size={14} className="text-red-500" />
            Important
          </span>
        )}
      </div>
      
      <p className="text-sm text-surface-600 line-clamp-2 leading-relaxed mb-4 pl-[3.25rem]">
        {notice.description}
      </p>
      
      <div className="flex items-center justify-between text-xs text-surface-500 pl-[3.25rem] font-medium">
        <span className="bg-surface-50 border border-surface-100 px-2 py-0.5 rounded-full">{notice.category}</span>
        <span className="flex items-center gap-1"><CalendarClock size={13} className="text-surface-400" /> {dateStr}</span>
      </div>
    </div>
  );
}
