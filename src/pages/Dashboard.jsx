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
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">
          {getGreeting()}, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-surface-500 mt-1">Here's what's happening in your society.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full min-w-0">
        <StatCard
          icon={IndianRupee}
          label="Monthly Maintenance"
          value={formatCurrency(CURRENT_DUE.amount)}
          sub={currentDuePaid ? 'Paid' : 'Pending'}
          iconBg={currentDuePaid ? 'bg-emerald-50' : 'bg-amber-50'}
          iconColor={currentDuePaid ? 'text-emerald-600' : 'text-amber-600'}
        />
        <StatCard
          icon={MessageSquareText}
          label="Open Complaints"
          value={openCount}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          icon={CheckCircle2}
          label="Resolved Complaints"
          value={resolvedCount}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          icon={CalendarDays}
          label="Next Payment Due"
          value={formatDate(CURRENT_DUE.dueDate)}
          iconBg="bg-primary-50"
          iconColor="text-primary-600"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full min-w-0">
        {/* Main Content Column */}
        <div className="xl:col-span-2 space-y-6 min-w-0">
          
          {/* Maintenance Section */}
          <div className="bg-white rounded-2xl border border-surface-200 p-6 sm:p-8 shadow-sm min-w-0 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-primary-50 to-transparent rounded-bl-full opacity-60 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-100 text-surface-600 text-xs font-semibold uppercase tracking-wider mb-3">
                  <IndianRupee size={12} />
                  Maintenance Fee
                </div>
                <h2 className="text-3xl font-bold text-surface-900 tracking-tight">{formatCurrency(CURRENT_DUE.amount)}</h2>
                <p className="text-sm font-medium text-surface-500 mt-1">For {CURRENT_DUE.month}</p>
              </div>
              
              <div className="sm:text-right">
                <p className="text-sm font-medium text-surface-500 mb-1">Due Date</p>
                <p className="text-base font-semibold text-surface-900">{formatDate(CURRENT_DUE.dueDate)}</p>
              </div>
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-surface-100">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-surface-500">Status:</span>
                {currentDuePaid ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    Paid on {lastPayment ? formatDate(lastPayment.date) : 'Recently'}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/50">
                    <CreditCard size={14} className="text-amber-500" />
                    Pending Payment
                  </span>
                )}
              </div>
              
              <div className="flex gap-3">
                {currentDuePaid ? (
                  <Link 
                    to="/payments"
                    className="inline-flex items-center justify-center gap-2 bg-white border border-surface-200 hover:bg-surface-50 hover:border-surface-300 text-surface-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm"
                  >
                    View Receipt
                  </Link>
                ) : (
                  <button 
                    onClick={() => setPayModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-sm"
                  >
                    <CreditCard size={16} />
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Recent Complaints */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-surface-900">Recent Complaints</h2>
              <Link
                to="/complaints"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>

            {recentComplaints.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0">
                {recentComplaints.map((c) => (
                  <ComplaintCard key={c.id} complaint={c} onClick={() => setSelectedComplaint(c)} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-surface-200 rounded-lg p-10 text-center">
                <FileQuestion size={40} className="text-surface-300 mx-auto mb-3" />
                <h3 className="font-medium text-surface-700 mb-1">No complaints found</h3>
                <p className="text-sm text-surface-500 mb-4">You haven't submitted any complaints yet.</p>
                <Link
                  to="/complaints"
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
                >
                  Submit your first complaint
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6 min-w-0">
          <SocietyQRCode />
          
          <div className="bg-white rounded-xl border border-surface-200 shadow-sm min-w-0 overflow-hidden">
            <div className="p-4 border-b border-surface-100 flex items-center justify-between bg-surface-50">
              <h3 className="font-semibold text-surface-900 flex items-center gap-2">
                <Bell size={18} className="text-primary-600" />
                Latest Notices
              </h3>
            </div>
            
            <div className="p-4 space-y-3">
              {recentNotices.length > 0 ? (
                recentNotices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-surface-500">No new society notices.</p>
                </div>
              )}
            </div>
          </div>
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
