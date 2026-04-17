"use client";

interface XpBarProps {
    xpInto: number;
    xpRequired: number;
    level: number;
}

export default function XpBar({ xpInto, xpRequired, level }: XpBarProps) {
    const pct = Math.min((xpInto / xpRequired) * 100, 100);

    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">XP to Level {level + 1}</span>
                <span className="text-[#c8f57a] font-semibold tabular-nums">
                    {xpInto.toLocaleString()} / {xpRequired.toLocaleString()}
                </span>
            </div>
            <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#c8f57a] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}