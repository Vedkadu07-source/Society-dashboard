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
  
  const expectedCollection = residents.length * CURRENT_DUE.amount;
  const collected = payments.filter((p) => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const collectionRate = expectedCollection === 0 ? 0 : Math.round((collected / expectedCollection) * 100);
  
  const recentComplaints = complaints.slice(0, 3);
  const recentNotices = notices.slice(0, 3);

  return (
    <div className="space-y-8 pb-10 w-full min-w-0">
      <div>
        <h1 className="text-3xl font-bold text-surface-900 tracking-tight">Committee Overview</h1>
        <p className="text-lg text-surface-500 mt-2">Good morning, {user?.name || 'Committee Member'} 👋 Here's your society at a glance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full min-w-0">
        <StatCard
          icon={Users}
          label="Total Residents"
          value={residents.length}
          iconBg="bg-primary-50"
          iconColor="text-primary-700"
        />
        <StatCard
          icon={Clock}
          label="Open Complaints"
          value={pendingComplaints}
          iconBg="bg-blue-50"
          iconColor="text-blue-700"
        />
        <StatCard
          icon={Bell}
          label="Pending Maintenance"
          value={pendingPayments}
          iconBg="bg-amber-50"
          iconColor="text-amber-700"
        />
        <StatCard
          icon={IndianRupee}
          label="Collection Rate"
          value={`${collectionRate}%`}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-700"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full min-w-0 pt-4">
        {/* Main Content Column */}
        <div className="xl:col-span-2 space-y-8 min-w-0">
          
          {/* Maintenance Progress */}
          <div className="bg-surface-900 rounded-2xl border border-surface-800 p-6 sm:p-8 shadow-xl min-w-0 relative overflow-hidden text-white">
            <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-primary-800/40 to-transparent rounded-bl-full opacity-60 pointer-events-none" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="relative z-10 flex items-center justify-between mb-8">
              <h3 className="font-bold text-white text-xl tracking-tight">Maintenance Collection</h3>
              <Link to="/admin/payments" className="text-sm text-primary-400 hover:text-primary-300 font-bold flex items-center gap-1 transition-colors bg-surface-800 hover:bg-surface-700 px-3 py-1.5 rounded-lg border border-surface-700">
                View Ledger <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="relative z-10 mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-surface-400 mb-2 uppercase tracking-widest">Collected ({CURRENT_DUE.month})</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">{formatCurrency(collected)}</span>
                  <span className="text-sm font-medium text-surface-400">of {formatCurrency(expectedCollection)}</span>
                </div>
              </div>
              <div className="sm:text-right flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
                <span className="text-3xl font-black text-emerald-400 tracking-tight">{collectionRate}%</span>
              </div>
            </div>
            
            <div className="relative z-10 w-full bg-surface-800 rounded-full h-4 mb-2 overflow-hidden border border-surface-700 shadow-inner">
              <div 
                className="bg-emerald-500 h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
                style={{ width: `${collectionRate}%` }}
              >
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
              </div>
            </div>
          </div>

          {/* Recent Complaints */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-surface-900 tracking-tight">Recent Complaints</h2>
              <Link to="/admin/complaints" className="text-sm text-primary-700 hover:text-primary-800 font-bold flex items-center gap-1 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors">
                Manage All <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="bg-white rounded-2xl border border-surface-200 shadow-sm min-w-0 overflow-hidden divide-y divide-surface-100">
              {recentComplaints.length > 0 ? (
                recentComplaints.map(c => (
                  <div key={c.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-50 transition-colors">
                    <div>
                      <p className="font-bold text-surface-900 mb-1">{c.title}</p>
                      <p className="text-[13px] font-medium text-surface-500 flex items-center gap-2">
                        <span className="bg-surface-100 text-surface-700 px-2 py-0.5 rounded-md text-xs">{c.resident}</span>
                        <span className="text-surface-300">•</span> 
                        <span className="font-bold">Flat {c.flat}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide border ${
                        c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' :
                        c.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200/60' :
                        c.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200/60' :
                        'bg-amber-50 text-amber-700 border-amber-200/60'
                      }`}>
                        {c.status}
                      </span>
                      <span className="text-xs font-bold text-surface-400 min-w-[70px] text-right">{formatDate(c.date)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-sm font-medium text-surface-500">No complaints reported.</div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8 min-w-0">
          
          {/* Recent Notices */}
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm min-w-0 overflow-hidden">
            <div className="p-5 border-b border-surface-100 flex items-center justify-between bg-surface-50">
              <h3 className="font-bold text-surface-900 flex items-center gap-2">
                <Bell size={18} className="text-primary-700" />
                Active Notices
              </h3>
            </div>
            
            <div className="p-5 space-y-4">
              {recentNotices.length > 0 ? (
                recentNotices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))
              ) : (
                <div className="text-center py-6 text-sm font-medium text-surface-500">
                  No active notices broadcasted.
                </div>
              )}
            </div>
          </div>
          
          <SocietyQRCode />
        </div>
      </div>
    </div>
  );
}
