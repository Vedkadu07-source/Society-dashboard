import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import StatCard from '../../components/StatCard';
import SocietyQRCode from '../../components/SocietyQRCode';
import NoticeCard from '../../components/NoticeCard';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { CURRENT_DUE } from '../../data/mockData';
import {
  Users,
  MessageSquareText,
  Clock,
  IndianRupee,
  Bell,
  ArrowRight
} from 'lucide-react';

export default function AdminOverview() {
  const { user, complaints, residents, payments, notices } = useApp();

  const pendingComplaints = complaints.filter((c) => c.status === 'Submitted' || c.status === 'In Progress').length;
  const pendingPayments = residents.filter((r) => r.paymentStatus === 'Pending').length;
  const collected = payments.filter((p) => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  
  const recentComplaints = complaints.slice(0, 3);
  const recentNotices = notices.slice(0, 3);

  return (
    <div className="space-y-6 w-full min-w-0">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Committee Dashboard</h1>
        <p className="text-surface-500 mt-1">Good morning, {user?.name || 'Committee Member'}. Manage complaints, notices and maintenance collection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full min-w-0">
        <StatCard
          icon={Users}
          label="Total Residents"
          value={residents.length}
          iconBg="bg-primary-50"
          iconColor="text-primary-600"
        />
        <StatCard
          icon={Clock}
          label="Open Complaints"
          value={pendingComplaints}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          icon={Bell}
          label="Pending Maintenance"
          value={pendingPayments}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          icon={IndianRupee}
          label="Collected This Month"
          value={formatCurrency(collected)}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full min-w-0">
        {/* Main Content Column */}
        <div className="xl:col-span-2 space-y-6 min-w-0">
          
          {/* Recent Complaints */}
          <div className="bg-white rounded-xl border border-surface-200 shadow-sm min-w-0 overflow-hidden">
            <div className="p-4 border-b border-surface-100 flex items-center justify-between bg-surface-50">
              <h3 className="font-semibold text-surface-900 flex items-center gap-2">
                <MessageSquareText size={18} className="text-primary-600" />
                Recent Complaints
              </h3>
              <Link to="/admin/complaints" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="divide-y divide-surface-100">
              {recentComplaints.length > 0 ? (
                recentComplaints.map(c => (
                  <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-50 transition-colors">
                    <div>
                      <p className="font-medium text-surface-900">{c.title}</p>
                      <p className="text-sm text-surface-500">{c.resident} • {c.flat}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                        c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
                        c.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {c.status}
                      </span>
                      <span className="text-xs text-surface-400 min-w-[70px] text-right">{formatDate(c.date)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-surface-500">No complaints reported.</div>
              )}
            </div>
          </div>

          {/* Recent Notices */}
          <div className="bg-white rounded-xl border border-surface-200 shadow-sm min-w-0 overflow-hidden">
            <div className="p-4 border-b border-surface-100 flex items-center justify-between bg-surface-50">
              <h3 className="font-semibold text-surface-900 flex items-center gap-2">
                <Bell size={18} className="text-primary-600" />
                Active Notices
              </h3>
              <Link to="/admin/notices" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                Manage Notices <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="p-4 space-y-3">
              {recentNotices.length > 0 ? (
                recentNotices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))
              ) : (
                <div className="text-center py-6 text-sm text-surface-500">
                  No active notices. Broadcast an announcement from the Notice Management page.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-6 min-w-0">
          <SocietyQRCode />
        </div>
      </div>
    </div>
  );
}
