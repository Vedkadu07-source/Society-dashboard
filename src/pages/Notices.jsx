import { useApp } from '../context/AppContext';
import NoticeCard from '../components/NoticeCard';
import { BellRing } from 'lucide-react';

export default function Notices() {
  const { notices } = useApp();

  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full min-w-0">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 tracking-tight">Society Notices</h1>
        <p className="text-sm font-medium text-surface-500 mt-1">Updates and announcements from the committee.</p>
      </div>

      <div className="bg-white rounded-2xl border border-surface-200 p-6 sm:p-8 shadow-sm min-w-0">
        <div className="space-y-4">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="bg-surface-50 border border-surface-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                <BellRing size={28} className="text-surface-400" />
              </div>
              <h3 className="text-lg font-bold text-surface-900 tracking-tight">No active notices</h3>
              <p className="text-sm font-medium text-surface-500 mt-2 max-w-sm mx-auto leading-relaxed">
                There are currently no announcements or updates from the society committee. Check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
