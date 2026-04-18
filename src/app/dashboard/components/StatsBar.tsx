import type { PlayerStatsDto } from "@models/dashboard";

interface Props {
    stats: PlayerStatsDto;
}

const statItems = (stats: PlayerStatsDto) => [
    { icon: "🔥", label: "Current Streak", value: `${stats.currentStreak}`, unit: "days" },
    { icon: "⚡", label: "Total XP", value: stats.totalXp.toLocaleString(), unit: "xp" },
    { icon: "🎯", label: "Quests Done", value: `${stats.questsDoneThisMonth}`, unit: "this month" },
    { icon: "🏆", label: "Best Streak", value: `${stats.longestStreak}`, unit: "days" },
    { icon: "🪙", label: "Coins", value: stats.coins.toLocaleString(), unit: "" },
];

const StatsBar = ({ stats }: Props) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {statItems(stats).map((item) => (
                <div
                    key={item.label}
                    className="bg-card border border-zinc-800 rounded-xl p-4 flex flex-col gap-1"
                >
                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs uppercase tracking-wider">
                        <span className="text-base leading-none">{item.icon}</span>
                        <span>{item.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black text-white tabular-nums">{item.value}</span>
                        {item.unit && <span className="text-xs text-zinc-500">{item.unit}</span>}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatsBar;