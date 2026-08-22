function StatCard({ label, value, icon: Icon, badge, color = "emerald" }) {
    const colorClasses = {
        emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        cyan: "text-sky-400 bg-sky-500/10 border-sky-500/20",
        purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    };

    return (
        <div className="flex items-center gap-4 px-6 py-5 min-w-0">
            {Icon && (
                <div className={`flex size-10 items-center justify-center rounded-xl border ${colorClasses[color] || colorClasses.emerald} shrink-0`}>
                    <Icon size={18} />
                </div>
            )}
            <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest truncate font-semibold">
                    {label}
                </span>
                <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-display font-extrabold text-white tabular-nums tracking-tight">
                        {value ?? "—"}
                    </span>
                    {badge && (
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-full">
                            {badge}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StatCard;