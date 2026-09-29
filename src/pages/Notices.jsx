import { useApp } from '../context/AppContext';
import NoticeCard from '../components/NoticeCard';
import { BellRing } from 'lucide-react';

export default function Notices() {
  const { notices } = useApp();

  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full min-w-0">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Society Notices</h1>
        <p className="text-surface-500 mt-1">Updates and announcements from the committee.</p>
      </div>

      <div className="bg-white rounded-xl border border-surface-200 p-4 sm:p-6 shadow-sm min-w-0">
        <div className="space-y-4">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="bg-surface-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BellRing size={24} className="text-surface-400" />
              </div>
              <h3 className="text-lg font-medium text-surface-900">No active notices</h3>
              <p className="text-surface-500 mt-1 max-w-sm mx-auto">
                There are currently no announcements or updates from the society committee.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
