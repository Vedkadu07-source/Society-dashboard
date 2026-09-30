import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ComplaintModal from '../components/ComplaintModal';
import PaymentModal from '../components/PaymentModal';
import SocietyQRCode from '../components/SocietyQRCode';
import { getGreeting, formatCurrency, formatDate } from '../utils/helpers';
import { CURRENT_DUE } from '../data/mockData';
import {
  IndianRupee,
  ArrowRight,
  CreditCard,
  Building2,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const { user, complaints, currentDuePaid, notices, payments } = useApp();
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [payModalOpen, setPayModalOpen] = useState(false);

  const myComplaints = complaints.filter(
    (c) => c.residentId === user?.id || c.resident === user?.name,
  );
  const openCount = myComplaints.filter((c) => c.status !== 'Resolved' && c.status !== 'Rejected').length;
  const recentComplaints = myComplaints.slice(0, 3);
  const recentNotices = notices.slice(0, 3);
  const lastPayment = payments.length > 0 ? payments[0] : null;

  return (
    <div className="w-full min-w-0">
      
      {/* 
        PERSONALIZED HERO
      */}
      <div className="mb-12 lg:mb-16">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-primary-100 flex items-center justify-center">
            <Building2 size={12} className="text-primary-700" />
          </div>
          <span className="text-[10px] font-bold text-surface-400 uppercase tracking-widest">Resident Portal</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-light text-surface-900 tracking-tight leading-tight mb-2">
          {getGreeting()}, <span className="font-semibold text-primary-600">{user?.name?.split(' ')[0] || 'Resident'}</span>
        </h1>
        <p className="text-sm text-surface-500 max-w-md">Unit {user?.flat || 'Resident'} · Here is your society overview and pending action items.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-20">
        
        {/* MAIN COLUMN */}
        <div className="xl:col-span-8 space-y-12 min-w-0">
          
          {/* MAINTENANCE STATUS */}
          <div className="bg-navy-950 p-8 lg:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px]" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <IndianRupee size={16} className="text-primary-400" />
                  <span className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">Maintenance Dues</span>
                </div>
                
                <p className="text-xs text-white/70 font-medium mb-1">
                  {CURRENT_DUE.month} Period
                </p>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-5xl lg:text-6xl font-light tracking-tight">{formatCurrency(CURRENT_DUE.amount)}</span>
                </div>
                
                {currentDuePaid ? (
                  <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest mt-4">
                    Paid on {lastPayment ? formatDate(lastPayment.date) : 'Recently'}
                  </p>
                ) : (
                  <p className="text-xs text-amber-400 font-bold uppercase tracking-widest mt-4">
                    Due {formatDate(CURRENT_DUE.dueDate)}
                  </p>
                )}
              </div>
              
              <div className="shrink-0">
                {currentDuePaid ? (
                  <Link 
                    to="/payments"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors border border-white/20"
                  >
                    View Receipt
                  </Link>
                ) : (
                  <button 
                    onClick={() => setPayModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-white hover:bg-surface-100 text-navy-950 text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors"
                  >
                    <CreditCard size={14} />
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RECENT COMPLAINTS */}
          <div>
            <div className="flex items-center justify-between border-b border-surface-200 pb-4 mb-6">
              <h2 className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em]">My Service Requests</h2>
              <Link to="/complaints" className="text-xs font-bold text-primary-600 hover:text-primary-700 uppercase tracking-widest flex items-center gap-1">
                View All <ArrowRight size={12} />
              </Link>
            </div>
            
            <div className="space-y-0">
              {recentComplaints.length > 0 ? (
                recentComplaints.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedComplaint(c)}
                    className="w-full text-left py-5 border-b border-surface-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-surface-50/50 transition-colors"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-surface-900 group-hover:text-primary-600 transition-colors mb-1">{c.title}</h3>
                      <p className="text-xs font-medium text-surface-500 uppercase tracking-widest">
                        {c.category} · {formatDate(c.date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-right shrink-0">
                      <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${
                        c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' :
                        c.status === 'Rejected' ? 'bg-red-50 text-red-700' :
                        c.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-8 text-surface-400 text-sm">No service requests submitted.</div>
              )}
            </div>
          </div>

        </div>

        {/* SIDEBAR COLUMN */}
        <div className="xl:col-span-4 space-y-12">
          
          {/* NOTICES */}
          <div>
            <h2 className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em] mb-6">Society Notices</h2>
            <div className="relative pl-4 border-l border-surface-200 space-y-8">
              {recentNotices.length > 0 ? (
                recentNotices.map((notice) => (
                  <div key={notice.id} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border border-primary-500" />
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-surface-400 uppercase tracking-widest">{formatDate(notice.date)}</span>
                      {notice.important && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded uppercase tracking-widest">
                          <AlertCircle size={10} /> Urgent
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-surface-900 leading-snug">{notice.title}</h3>
                  </div>
                ))
              ) : (
                <div className="text-surface-400 text-sm">No active notices.</div>
              )}
            </div>
          </div>

          <SocietyQRCode />
        </div>

      </div>

      <ComplaintModal open={!!selectedComplaint} onClose={() => setSelectedComplaint(null)} complaint={selectedComplaint} />
      <PaymentModal open={payModalOpen} onClose={() => setPayModalOpen(false)} />
    </div>
  );
}
