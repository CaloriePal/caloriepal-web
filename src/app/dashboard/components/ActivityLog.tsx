const mockEntries = [
    { icon: "⚡", iconColor: "text-lime", label: "Earned 50 XP from workout", timeAgo: "2h ago" },
    { icon: "🏆", iconColor: "text-gold", label: "Achievement unlocked: Iron Will", timeAgo: "5h ago" },
    { icon: "📈", iconColor: "text-sky", label: "Reached Level 12!", timeAgo: "1d ago" },
    { icon: "⭐", iconColor: "text-rose", label: "7-day streak bonus: +100 XP", timeAgo: "1d ago" },
    { icon: "⚡", iconColor: "text-lime", label: "Earned 30 XP from nutrition goal", timeAgo: "2d ago" },
];

const ActivityLog = () => {
    return (
        <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Activity Log</h2>
            <div className="space-y-1">
                {mockEntries.map((entry, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-zinc-800/60 last:border-0">
                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                            <span className={`text-sm ${entry.iconColor}`}>{entry.icon}</span>
                        </div>
                        <span className="flex-1 text-xs text-zinc-300 leading-snug">{entry.label}</span>
                        <span className="text-[10px] text-zinc-600 whitespace-nowrap">{entry.timeAgo}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityLog;
