import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import { ComplaintCard } from '../components/ComplaintCard';
import ComplaintModal from '../components/ComplaintModal';
import PaymentModal from '../components/PaymentModal';
import SocietyQRCode from '../components/SocietyQRCode';
import NoticeCard from '../components/NoticeCard';
import { getGreeting, formatCurrency, formatDate } from '../utils/helpers';
import { CURRENT_DUE } from '../data/mockData';
import {
  IndianRupee,
  MessageSquareText,
  CheckCircle2,
  CalendarDays,
  ArrowRight,
  FileQuestion,
  CreditCard,
  Bell
} from 'lucide-react';

export default function Dashboard() {
  const { user, complaints, currentDuePaid, notices, payments } = useApp();
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [payModalOpen, setPayModalOpen] = useState(false);

  // Complaints
  const myComplaints = complaints.filter(
    (c) => c.residentId === user?.id || c.resident === user?.name,
  );
  const openCount = myComplaints.filter((c) => c.status !== 'Resolved' && c.status !== 'Rejected').length;
  const resolvedCount = myComplaints.filter((c) => c.status === 'Resolved').length;
  const recentComplaints = myComplaints.slice(0, 3);
  
  // Notices
  const recentNotices = notices.slice(0, 3);

  // Payment info
  const myPayments = payments.filter(p => p.residentId === user?.id);
  const lastPayment = myPayments.length > 0 ? myPayments[0] : null;

  return (
    <div className="space-y-8 pb-10">
      {/* Greeting */}
      <div className="pt-2">
        <h1 className="text-3xl font-bold text-surface-900 tracking-tight">
          {getGreeting()}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-surface-500 mt-2 text-lg">Here's what's happening in your society today.</p>
      </div>

      {/* Primary Action: Maintenance Card */}
      <div className="bg-surface-900 rounded-2xl border border-surface-800 p-6 sm:p-8 shadow-xl min-w-0 relative overflow-hidden text-white">
        {/* Background decoration */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-primary-800/40 to-transparent rounded-bl-full opacity-60 pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-800 text-surface-300 text-xs font-bold uppercase tracking-widest mb-4 border border-surface-700 shadow-sm">
              <IndianRupee size={12} />
              {currentDuePaid ? 'Maintenance Paid' : 'Maintenance Due'}
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
              {formatCurrency(CURRENT_DUE.amount)}
            </h2>
            <p className="text-surface-400 font-medium text-sm sm:text-base">
              For {CURRENT_DUE.month} • {currentDuePaid ? `Paid on ${lastPayment ? formatDate(lastPayment.date) : 'Recently'}` : `Due ${formatDate(CURRENT_DUE.dueDate)}`}
            </p>
          </div>
          
          <div className="flex shrink-0">
            {currentDuePaid ? (
              <Link 
                to="/payments"
                className="inline-flex items-center justify-center gap-2 bg-surface-800 border border-surface-700 hover:bg-surface-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-sm"
              >
                View Receipt
              </Link>
            ) : (
              <button 
                onClick={() => setPayModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-primary-900/20"
              >
                <CreditCard size={18} />
                Pay Maintenance
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full min-w-0">
        <StatCard
          icon={MessageSquareText}
          label="Open Complaints"
          value={openCount}
          iconBg="bg-primary-50"
          iconColor="text-primary-700"
        />
        <StatCard
          icon={CheckCircle2}
          label="Resolved Complaints"
          value={resolvedCount}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-700"
        />
        <StatCard
          icon={CalendarDays}
          label="Next Payment"
          value={formatDate(CURRENT_DUE.dueDate)}
          iconBg="bg-surface-100"
          iconColor="text-surface-700"
        />
        <StatCard
          icon={Bell}
          label="New Notices"
          value={recentNotices.length}
          iconBg="bg-blue-50"
          iconColor="text-blue-700"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full min-w-0 pt-4">
        {/* Main Content Column */}
        <div className="xl:col-span-2 space-y-8 min-w-0">
          
          {/* Recent Complaints */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-surface-900 tracking-tight">Recent Complaints</h2>
              <Link
                to="/complaints"
                className="text-sm text-primary-700 hover:text-primary-800 font-bold flex items-center gap-1 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>

            {recentComplaints.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full min-w-0">
                {recentComplaints.map((c) => (
                  <ComplaintCard key={c.id} complaint={c} onClick={() => setSelectedComplaint(c)} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-surface-200 rounded-2xl p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-surface-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-surface-100">
                  <FileQuestion size={32} className="text-surface-400" />
                </div>
                <h3 className="font-bold text-surface-900 mb-2 text-lg">No complaints found</h3>
                <p className="text-surface-500 mb-6 max-w-sm mx-auto">You haven't submitted any complaints yet. Your society issues will appear here.</p>
                <Link
                  to="/complaints"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-surface-200 hover:bg-surface-50 text-surface-900 text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-sm"
                >
                  Submit your first complaint
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8 min-w-0">
          
          {/* Notices */}
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm min-w-0 overflow-hidden">
            <div className="p-5 border-b border-surface-100 flex items-center justify-between bg-surface-50">
              <h3 className="font-bold text-surface-900 flex items-center gap-2">
                <Bell size={18} className="text-primary-700" />
                Latest Notices
              </h3>
            </div>
            
            <div className="p-5 space-y-4">
              {recentNotices.length > 0 ? (
                recentNotices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm font-medium text-surface-500">No new society notices.</p>
                </div>
              )}
            </div>
          </div>
          
          <SocietyQRCode />

        </div>
      </div>

      <ComplaintModal
        open={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        complaint={selectedComplaint}
      />
      
      <PaymentModal 
        open={payModalOpen}
        onClose={() => setPayModalOpen(false)}
      />
    </div>
  );
}
