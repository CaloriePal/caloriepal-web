import type { ActivityLogEntryDto } from "@models/dashboard";

const categoryStyle: Record<ActivityLogEntryDto["category"], { icon: string; color: string }> = {
    Training: { icon: "⚡", color: "text-lime" },
    Nutrition: { icon: "🍎", color: "text-sky" },
    Mindset:  { icon: "✨", color: "text-gold" },
};

function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
}

interface Props {
    entries: ActivityLogEntryDto[];
}

const ActivityLog = ({ entries }: Props) => {
    return (
        <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Activity Log</h2>
            {entries.length === 0 ? (
                <p className="text-sand text-xs py-2">No activity yet. Complete a quest to get started!</p>
            ) : (
                <div className="space-y-1">
                    {entries.map((entry) => {
                        const style = categoryStyle[entry.category];
                        return (
                            <div key={entry.logId} className="flex items-center gap-3 py-2 border-b border-border/60 last:border-0">
                                <div className="w-8 h-8 rounded-lg bg-subtle flex items-center justify-center flex-shrink-0">
                                    <span className={`text-sm ${style.color}`}>{style.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-muted leading-snug truncate">{entry.questTitle}</p>
                                    <p className="text-[10px] text-lime font-semibold">+{entry.xpAwarded} XP</p>
                                </div>
                                <span className="text-[10px] text-dim whitespace-nowrap">{timeAgo(entry.completedAt)}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ActivityLog;
