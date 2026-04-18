"use client";

interface Props {
    streak: number;
    longestStreak: number;
    freezes: number;
}

const StreakCalendar = ({ streak, longestStreak, freezes }: Props) => {
    const today = new Date();
    const dayNames = ["M", "T", "W", "T", "F", "S", "S"];

    const days = Array.from({ length: 28 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (27 - i));
        const isActive = i >= 28 - streak;
        const isToday = i === 27;
        return { date: d.getDate(), isActive, isToday };
    });

    const weeks = Array.from({ length: 4 }, (_, w) => days.slice(w * 7, w * 7 + 7));

    return (
        <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-widest text-white">Streak</h2>
                <div className="flex items-center gap-1.5 text-rose font-black text-sm">
                    <span>🔥</span>
                    <span>{streak}</span>
                </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2">
                {dayNames.map((d, i) => (
                    <div key={i} className="text-center text-[10px] text-dim font-medium">{d}</div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="space-y-2 pb-2">
                {weeks.map((week, wi) => (
                    <div key={wi} className="grid grid-cols-7 gap-2">
                        {week.map((day, di) => (
                            <div
                                key={di}
                                className={`
                                    w-8 h-8 mx-auto rounded-full flex items-center justify-center text-[10px] font-semibold transition-all
                                    ${day.isToday
                                        ? "bg-lime text-black"
                                        : day.isActive
                                            ? "bg-lime/20 text-lime"
                                            : "bg-subtle/60 text-dim"
                                    }
                                `}
                            >
                                {day.date}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Stats row */}
            <div className="pt-2 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted">
                    Current: <span className="text-lime font-semibold">{streak} days</span>
                </span>
                <span className="text-xs text-muted">
                    Best: <span className="text-lime font-semibold">{longestStreak} days</span>
                </span>
            </div>

            {/* Freezes */}
            {freezes > 0 && (
                <div className="flex items-center gap-2 border-t border-border pt-2">
                    <span className="text-sky text-sm">🛡️</span>
                    <span className="text-xs text-muted">
                        {freezes} streak freeze{freezes !== 1 ? "s" : ""} available
                    </span>
                </div>
            )}
        </div>
    );
}

export default StreakCalendar;
