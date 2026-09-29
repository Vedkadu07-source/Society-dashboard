import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import { ComplaintCard } from '../components/ComplaintCard';
import ComplaintModal from '../components/ComplaintModal';
import { getGreeting, formatCurrency, formatDate } from '../utils/helpers';
import { CURRENT_DUE } from '../data/mockData';
import {
  IndianRupee,
  MessageSquareText,
  CheckCircle2,
  CalendarDays,
  ArrowRight,
  FileQuestion,
} from 'lucide-react';

export default function Dashboard() {
  const { user, complaints, currentDuePaid } = useApp();
  const [selected, setSelected] = useState(null);

  // Only show the logged-in resident's complaints
  const myComplaints = complaints.filter(
    (c) => c.residentId === user?.id || c.resident === user?.name,
  );
  const openCount = myComplaints.filter((c) => c.status !== 'Resolved' && c.status !== 'Rejected').length;
  const resolvedCount = myComplaints.filter((c) => c.status === 'Resolved').length;
  const recent = myComplaints.slice(0, 3);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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

      {/* Recent complaints */}
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

        {recent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {recent.map((c) => (
              <ComplaintCard key={c.id} complaint={c} onClick={() => setSelected(c)} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-surface-200 rounded-lg p-10 text-center">
            <FileQuestion size={40} className="text-surface-300 mx-auto mb-3" />
            <h3 className="font-medium text-surface-700 mb-1">No complaints found</h3>
            <p className="text-sm text-surface-500 mb-4">You haven't submitted any complaints yet.</p>
            <Link
              to="/complaints"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200"
            >
              Submit your first complaint
            </Link>
          </div>
        )}
      </div>

      {/* Complaint modal */}
      <ComplaintModal
        open={!!selected}
        onClose={() => setSelected(null)}
        complaint={selected}
      />
    </div>
  );
}
