import { useApp } from '../context/AppContext';
import { formatDate } from '../utils/helpers';
import { BellRing, AlertCircle, CalendarClock } from 'lucide-react';

export default function Notices() {
  const { notices } = useApp();

  return (
    <div className="w-full min-w-0 max-w-4xl">
      <div className="mb-12 border-b border-surface-200 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <BellRing size={16} className="text-surface-400" />
          <span className="text-[10px] font-bold text-surface-400 uppercase tracking-widest">Notice Board</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-light text-surface-900 tracking-tight leading-tight">
          Society <span className="font-semibold text-primary-600">Announcements</span>
        </h1>
      </div>

      {notices.length > 0 ? (
        <div className="space-y-12">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="group relative pl-6 border-l-2 border-surface-200 hover:border-primary-500 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">
                  {formatDate(notice.date)}
                </span>
                <span className="w-1 h-1 rounded-full bg-surface-300" />
                <span className="text-xs font-bold text-surface-500 uppercase tracking-widest">
                  {notice.category}
                </span>
                {notice.important && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-surface-300" />
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded uppercase tracking-widest">
                      <AlertCircle size={10} /> Urgent
                    </span>
                  </>
                )}
              </div>
              
              <h3 className="text-2xl font-semibold text-surface-900 leading-snug mb-3">
                {notice.title}
              </h3>
              
              <p className="text-sm text-surface-600 leading-relaxed max-w-3xl whitespace-pre-wrap">
                {notice.description}
              </p>
              
              <div className="mt-4 pt-4 border-t border-surface-100 flex items-center gap-2 text-xs text-surface-400">
                <span className="font-semibold text-surface-900">{notice.createdBy || 'Committee'}</span>
                <span>posted this announcement</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <BellRing size={48} className="text-surface-200 mx-auto mb-6" />
          <h3 className="text-xl font-light text-surface-900 mb-2">No active announcements</h3>
          <p className="text-sm text-surface-500 max-w-sm mx-auto">
            The society committee has not posted any notices recently.
          </p>
        </div>
      )}
    </div>
  );
}
