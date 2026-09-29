import { useApp } from '../../context/AppContext';
import StatCard from '../../components/StatCard';
import { formatCurrency } from '../../utils/helpers';
import { CURRENT_DUE } from '../../data/mockData';
import {
  Users,
  MessageSquareText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  IndianRupee,
} from 'lucide-react';

export default function AdminOverview() {
  const { complaints, residents, payments, currentDuePaid } = useApp();

  const pending = complaints.filter((c) => c.status === 'Submitted' || c.status === 'In Progress').length;
  const resolved = complaints.filter((c) => c.status === 'Resolved').length;
  const pendingPayments = residents.filter((r) => r.paymentStatus === 'Pending').length;
  const collected = payments.filter((p) => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Admin Dashboard</h1>
        <p className="text-surface-500 mt-0.5">Society Management Overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={Users}
          label="Total Residents"
          value={residents.length}
          iconBg="bg-primary-50"
          iconColor="text-primary-600"
        />
        <StatCard
          icon={MessageSquareText}
          label="Total Complaints"
          value={complaints.length}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          icon={Clock}
          label="Pending Complaints"
          value={pending}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          icon={CheckCircle2}
          label="Resolved Complaints"
          value={resolved}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          icon={AlertTriangle}
          label="Pending Payments"
          value={pendingPayments}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          icon={IndianRupee}
          label="Collected This Month"
          value={formatCurrency(collected)}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
      </div>
    </div>
  );
}
