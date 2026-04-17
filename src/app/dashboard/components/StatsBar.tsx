import type { PlayerStatsDto, DailyQuestsDto } from "@models/dashboard";

interface Props {
    stats: PlayerStatsDto;
    questsData: DailyQuestsDto;
}

const statItems = (stats: PlayerStatsDto, questsData: DailyQuestsDto) => [
    { icon: "🔥", label: "Current Streak", value: `${stats.currentStreak}`, unit: "days" },
    { icon: "⚡", label: "Total XP", value: stats.totalXp.toLocaleString(), unit: "xp" },
    { icon: "🎯", label: "Quests Done", value: `${questsData.completedCount}/${questsData.quests.length}`, unit: "today" },
    { icon: "🏆", label: "Best Streak", value: `${stats.longestStreak}`, unit: "days" },
    { icon: "🪙", label: "Coins", value: stats.coins.toLocaleString(), unit: "" },
];

export default function StatsBar({ stats, questsData }: Props) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {statItems(stats, questsData).map((item) => (
                <div
                    key={item.label}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-1"
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