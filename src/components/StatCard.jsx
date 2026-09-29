export default function StatCard({ icon: Icon, label, value, sub, iconBg = 'bg-primary-50', iconColor = 'text-primary-600' }) {
  return (
    <div className="bg-white rounded-2xl border border-surface-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 min-w-0 group cursor-default relative overflow-hidden">
      <div className="flex items-start justify-between gap-4 mb-2 relative z-10">
        <p className="text-[13px] font-semibold text-surface-500 uppercase tracking-wide truncate">{label}</p>
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm border border-white/50`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="relative z-10 mt-1">
        <p className="text-3xl font-bold text-surface-900 truncate tracking-tight">{value}</p>
        {sub && <p className="text-[11px] font-bold uppercase tracking-wider text-surface-400 mt-2 truncate bg-surface-50 px-2 py-0.5 rounded-md inline-block border border-surface-100">{sub}</p>}
      </div>
    </div>
  );
}
