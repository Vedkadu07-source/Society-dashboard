export default function StatCard({ icon: Icon, label, value, sub, trend, iconBg = 'bg-primary-50', iconColor = 'text-primary-600' }) {
  return (
    <div className="bg-white rounded-xl border border-surface-200/80 p-4 sm:p-5 min-w-0 group cursor-default relative overflow-hidden hover:border-surface-300 transition-colors">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className={`${iconBg} ${iconColor} p-2 rounded-lg shrink-0`}>
          <Icon size={16} />
        </div>
        {trend && (
          <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${
            trend > 0 ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-surface-900 tracking-tight truncate leading-none">{value}</p>
      <p className="text-[12px] font-medium text-surface-500 mt-1.5 truncate">{label}</p>
      {sub && <p className="text-[11px] text-surface-400 mt-0.5 truncate">{sub}</p>}
    </div>
  );
}
