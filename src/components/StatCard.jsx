export default function StatCard({ icon: Icon, label, value, sub, iconBg = 'bg-primary-50', iconColor = 'text-primary-600' }) {
  return (
    <div className="bg-white rounded-xl border border-surface-200 p-5 flex items-start gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-0 group cursor-default">
      <div className={`${iconBg} ${iconColor} p-3 rounded-lg shrink-0 transition-transform duration-200 group-hover:scale-110`}>
        <Icon size={22} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-surface-500 mb-1 truncate">{label}</p>
        <p className="text-2xl font-semibold text-surface-900 truncate">{value}</p>
        {sub && <p className="text-xs font-medium text-surface-400 mt-1 truncate">{sub}</p>}
      </div>
    </div>
  );
}
