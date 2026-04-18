import type { PlayerStatsDto } from "@models/dashboard";
import XpBar from "./XpBar";

interface Props { stats: PlayerStatsDto; }

const HeroCard = ({ stats }: Props) => {
    return (
        <div className="bg-card border border-border rounded-2xl p-6">
            {/* Top row */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-rose text-sm font-semibold">
                    <span>🔥</span>
                    <span>{stats.currentStreak} day streak</span>
                </div>
                <div className="flex items-center gap-2 text-lime text-sm font-semibold">
                    <span>🪙</span>
                    <span>{stats.coins.toLocaleString()}</span>
                </div>
            </div>
            <div className="border-t border-border my-4" />

            {/* Profile row */}
            <div className="flex items-center gap-5">
                {/* Avatar + level badge */}
                <div className="relative flex-shrink-0">
                    <img
                        src={"./avatar.png"}
                        alt={stats.displayName}
                        className="w-20 h-20 rounded-xl object-cover border-2 border-lime shadow-[0_0_18px_rgba(200,245,122,0.45)]"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-lime text-black text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">
                        LVL {stats.level}
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pt-1">
                    <h1 className="text-2xl font-black tracking-wide text-white truncate font-heading">
                        {stats.displayName}
                    </h1>
                    <p className="text-lime text-sm font-semibold mt-0.5">{stats.title}</p>
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

export default HeroCard;