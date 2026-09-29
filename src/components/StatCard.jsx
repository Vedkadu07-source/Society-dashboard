export default function StatCard({ icon: Icon, label, value, sub, iconBg = 'bg-primary-50', iconColor = 'text-primary-600' }) {
  return (
    <div className="bg-white rounded-lg border border-surface-200 p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`${iconBg} ${iconColor} p-3 rounded-lg shrink-0`}>
        <Icon size={22} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-surface-500 mb-1">{label}</p>
        <p className="text-xl font-semibold text-surface-900 truncate">{value}</p>
        {sub && <p className="text-xs text-surface-400 mt-1">{sub}</p>}
      </div>
    </div>
  );
}
