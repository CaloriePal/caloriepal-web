import type { PlayerStatsDto } from "@models/dashboard";
import XpBar from "./XpBar";

interface Props { stats: PlayerStatsDto; }

export default function HeroCard({ stats }: Props) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            {/* Top row */}
            <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold">
                    <span>🔥</span>
                    <span>{stats.currentStreak} day streak</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-400 text-sm font-semibold">
                    <span>🪙</span>
                    <span>{stats.coins.toLocaleString()}</span>
                </div>
            </div>

            {/* Profile row */}
            <div className="flex items-center gap-5">
                {/* Avatar + level badge */}
                <div className="relative flex-shrink-0">
                    {stats.avatarUrl ? (
                        <img
                            src={stats.avatarUrl}
                            alt={stats.displayName}
                            className="w-20 h-20 rounded-xl object-cover border-2 border-zinc-700"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-xl bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-2xl font-bold text-[#c8f57a]">
                            {stats.displayName.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#c8f57a] text-black text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">
                        LVL {stats.level}
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pt-1">
                    <h1 className="text-2xl font-black tracking-wide uppercase text-white truncate font-['DM_Serif_Display']">
                        {stats.displayName}
                    </h1>
                    <p className="text-[#c8f57a] text-sm font-semibold mt-0.5">{stats.title}</p>
                    <div className="mt-4">
                        <XpBar
                            xpInto={stats.xpIntoCurrentLevel}
                            xpRequired={stats.xpRequiredForNextLevel}
                            level={stats.level}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}