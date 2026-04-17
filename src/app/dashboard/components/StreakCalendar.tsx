"use client";

interface Props {
    streak: number;
    freezes: number;
}

export default function StreakCalendar({ streak, freezes }: Props) {
    const today = new Date();
    const dayNames = ["M", "T", "W", "T", "F", "S", "S"];

    // Build last 28 days grid
    const days = Array.from({ length: 28 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (27 - i));
        const isActive = i >= 28 - streak;
        const isToday = i === 27;
        return { date: d.getDate(), isActive, isToday };
    });

    // 4 rows of 7
    const weeks = Array.from({ length: 4 }, (_, w) => days.slice(w * 7, w * 7 + 7));

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-widest text-white">Streak</h2>
                <div className="flex items-center gap-1.5 text-orange-400 font-black text-sm">
                    <span>🔥</span>
                    <span>{streak}</span>
                </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1">
                {dayNames.map((d, i) => (
                    <div key={i} className="text-center text-[10px] text-zinc-600 font-medium">{d}</div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="space-y-1">
                {weeks.map((week, wi) => (
                    <div key={wi} className="grid grid-cols-7 gap-1">
                        {week.map((day, di) => (
                            <div
                                key={di}
                                className={`
                  aspect-square rounded-full flex items-center justify-center text-[10px] font-semibold transition-all
                  ${day.isToday
                                        ? "bg-[#c8f57a] text-black ring-2 ring-[#c8f57a] ring-offset-1 ring-offset-zinc-900"
                                        : day.isActive
                                            ? "bg-[#c8f57a]/20 text-[#c8f57a]"
                                            : "bg-zinc-800 text-zinc-600"
                                    }
                `}
                            >
                                {day.date}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Freezes */}
            {freezes > 0 && (
                <div className="flex items-center gap-2 pt-1 border-t border-zinc-800">
                    <span className="text-blue-400 text-sm">🛡️</span>
                    <span className="text-xs text-zinc-400">
                        {freezes} streak freeze{freezes !== 1 ? "s" : ""} available
                    </span>
                </div>
            )}
        </div>
    );
}