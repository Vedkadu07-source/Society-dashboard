import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { CURRENT_DUE } from '../../data/mockData';
import {
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Building2,
  CalendarClock
} from 'lucide-react';

export default function AdminOverview() {
  const { user, complaints, residents, notices } = useApp();

  const pendingComplaints = complaints.filter((c) => c.status === 'Submitted' || c.status === 'In Progress').length;
  const resolvedComplaints = complaints.filter((c) => c.status === 'Resolved').length;
  const pendingPayments = residents.filter((r) => r.paymentStatus === 'Pending').length;
  const paidResidents = residents.filter((r) => r.paymentStatus === 'Paid').length;
  
  const expectedCollection = residents.length * CURRENT_DUE.amount;
  const collected = paidResidents * CURRENT_DUE.amount;
  const collectionRate = expectedCollection === 0 ? 0 : Math.round((collected / expectedCollection) * 100);
  
  const recentComplaints = complaints.slice(0, 3);
  const recentNotices = notices.slice(0, 3);

  return (
    <div className="w-full min-w-0">
      
      {/* 
        HERO SECTION 
        A large architectural visual block. Not a simple gradient rectangle.
      */}
      <div className="relative w-full h-[450px] lg:h-[500px] overflow-hidden mb-12">
        <div className="absolute inset-0 bg-navy-950">
          {/* Faux architectural structural lines for the "architectural SaaS" feel */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(45deg, #fff 1px, transparent 1px), linear-gradient(-45deg, #fff 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} />
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-navy-950 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface-50 to-transparent z-10" />
        </div>

        <div className="relative z-20 h-full flex flex-col justify-end pb-16 lg:pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                <Building2 size={14} className="text-white" />
              </div>
              <span className="text-xs font-bold text-white/70 uppercase tracking-[0.2em]">Management Console</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6">
              Society operations,<br />
              <span className="font-semibold text-primary-400">orchestrated.</span>
            </h1>
            
            <p className="text-lg text-white/60 font-light leading-relaxed max-w-xl mb-10">
              Good morning, {user?.name?.split(' ')[0] || 'Committee Member'}. Overview of current residential activity, maintenance collection, and pending service requests.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to="/admin/complaints" 
                className="bg-white text-navy-950 px-6 py-3.5 rounded-none font-semibold text-sm hover:bg-surface-100 transition-colors flex items-center gap-2"
              >
                Operations Desk <ArrowRight size={16} />
              </Link>
              <Link 
                to="/admin/payments" 
                className="bg-white/10 backdrop-blur-md text-white px-6 py-3.5 rounded-none font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20"
              >
                Treasury
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 
        COMMUNITY PULSE 
        Unified metrics strip, NOT four individual cards.
      */}
      <div className="mb-20">
        <h2 className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em] mb-6 border-b border-surface-200 pb-4">Community Pulse</h2>
        
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 lg:divide-x divide-surface-200">
          <div className="flex-1 lg:pr-10">
            <p className="text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-2">Total Residents</p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-light text-surface-900 tracking-tight">{residents.length}</span>
              <span className="text-sm font-medium text-surface-500 bg-surface-100 px-2 py-0.5 rounded">{paidResidents} Paid</span>
            </div>
          </div>
          <div className="flex-1 lg:px-10">
            <p className="text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-2">Active Issues</p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-light text-surface-900 tracking-tight">{pendingComplaints}</span>
              <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded flex items-center gap-1">Requires Action</span>
            </div>
          </div>
          <div className="flex-1 lg:pl-10">
            <p className="text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-2">Resolved YTD</p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-light text-surface-900 tracking-tight">{resolvedComplaints}</span>
              <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ASYMMETRIC LAYOUT
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
        
        {/* LEFT COLUMN: Main Operations */}
        <div className="lg:col-span-7 xl:col-span-8">
          
          {/* DARK FINANCIAL BLOCK */}
          <div className="mb-16">
            <div className="bg-navy-950 p-8 lg:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px]" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">Treasury Snapshot</h2>
                  <TrendingUp size={20} className="text-primary-400" />
                </div>
                
                <div className="mb-12">
                  <p className="text-sm text-white/70 font-medium mb-2">Maintenance Collection — {CURRENT_DUE.month}</p>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-5xl lg:text-6xl font-light tracking-tight">{formatCurrency(collected)}</span>
                    <span className="text-xl text-white/50">/ {formatCurrency(expectedCollection)}</span>
                  </div>
                  
                  <div className="w-full bg-white/10 h-1 mt-6">
                    <div className="bg-primary-400 h-full" style={{ width: `${collectionRate}%` }} />
                  </div>
                  <div className="flex justify-between mt-3 text-xs font-bold uppercase tracking-widest text-white/50">
                    <span>{collectionRate}% Collected</span>
                    <span>{pendingPayments} Pending</span>
                  </div>
                </div>

                <Link to="/admin/payments" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors">
                  View Full Ledger <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* ACTIVE OPERATIONS LIST */}
          <div>
            <div className="flex items-center justify-between border-b border-surface-200 pb-4 mb-6">
              <h2 className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em]">Recent Service Requests</h2>
              <Link to="/admin/complaints" className="text-xs font-bold text-primary-600 hover:text-primary-700 uppercase tracking-widest flex items-center gap-1">
                View All <ArrowRight size={12} />
              </Link>
            </div>
            
            <div className="space-y-0">
              {recentComplaints.length > 0 ? (
                recentComplaints.map(c => (
                  <div key={c.id} className="py-5 border-b border-surface-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-[10px] font-mono text-surface-400 bg-surface-100 px-1.5 py-0.5 rounded">{c.id}</span>
                        <h3 className="text-base font-semibold text-surface-900 group-hover:text-primary-600 transition-colors">{c.title}</h3>
                      </div>
                      <p className="text-sm text-surface-500 font-medium">
                        Unit {c.flat} · {c.resident}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-xs font-medium text-surface-400">{formatDate(c.date)}</span>
                      <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${
                        c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' :
                        c.status === 'Rejected' ? 'bg-red-50 text-red-700' :
                        c.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-surface-400 text-sm">No active requests.</div>
              )}
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN: Side Info */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-12">
          
          {/* QUICK ACTIONS */}
          <div>
            <h2 className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em] mb-6">Quick Controls</h2>
            <div className="space-y-3">
              <Link to="/admin/notices" className="block p-4 border border-surface-200 hover:border-primary-500 hover:bg-primary-50 transition-colors group">
                <h3 className="text-sm font-semibold text-surface-900 group-hover:text-primary-700 mb-1">Publish Notice</h3>
                <p className="text-xs text-surface-500">Broadcast updates to all residents</p>
              </Link>
              <Link to="/admin/complaints" className="block p-4 border border-surface-200 hover:border-primary-500 hover:bg-primary-50 transition-colors group">
                <h3 className="text-sm font-semibold text-surface-900 group-hover:text-primary-700 mb-1">Process Requests</h3>
                <p className="text-xs text-surface-500">{pendingComplaints} requests await action</p>
              </Link>
              <Link to="/admin/payments" className="block p-4 border border-surface-200 hover:border-primary-500 hover:bg-primary-50 transition-colors group">
                <h3 className="text-sm font-semibold text-surface-900 group-hover:text-primary-700 mb-1">Send Payment Reminders</h3>
                <p className="text-xs text-surface-500">Notify {pendingPayments} pending units</p>
              </Link>
            </div>
          </div>

          {/* ACTIVE NOTICES */}
          <div>
            <h2 className="text-xs font-bold text-surface-400 uppercase tracking-[0.2em] mb-6">Notice Board</h2>
            <div className="relative pl-4 border-l border-surface-200 space-y-8">
              {recentNotices.map((notice) => (
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
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
