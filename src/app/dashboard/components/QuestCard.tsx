"use client";

import type { DailyQuestItemDto } from "@models/dashboard";

const categoryColors: Record<DailyQuestItemDto["category"], string> = {
    Training: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Nutrition: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Mindset: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

interface Props {
    quest: DailyQuestItemDto;
    isCompleting: boolean;
    onComplete: () => void;
}

export default function QuestCard({ quest, isCompleting, onComplete }: Props) {
    const colorClass = categoryColors[quest.category] ?? "bg-zinc-700/30 text-zinc-400 border-zinc-600/20";

    return (
        <div
            className={`
        flex items-center gap-4 p-4 rounded-xl border transition-all duration-200
        ${quest.isCompleted
                    ? "bg-zinc-800/40 border-zinc-800 opacity-60"
                    : "bg-zinc-800/60 border-zinc-700/50 hover:border-zinc-600 cursor-pointer"
                }
      `}
            onClick={!quest.isCompleted && !isCompleting ? onComplete : undefined}
        >
            {/* Checkbox */}
            <button
                disabled={quest.isCompleted || isCompleting}
                onClick={(e) => { e.stopPropagation(); onComplete(); }}
                className={`
          flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
          ${quest.isCompleted
                        ? "bg-[#c8f57a] border-[#c8f57a]"
                        : isCompleting
                            ? "border-[#c8f57a] animate-pulse"
                            : "border-zinc-600 hover:border-[#c8f57a]"
                    }
        `}
            >
                {quest.isCompleted && (
                    <svg className="w-3 h-3 text-black" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
                {isCompleting && !quest.isCompleted && (
                    <div className="w-2 h-2 bg-[#c8f57a] rounded-full animate-ping" />
                )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${quest.isCompleted ? "line-through text-zinc-500" : "text-white"}`}>
                    {quest.title}
                </p>
                <p className="text-zinc-500 text-xs mt-0.5 truncate">{quest.description}</p>
            </div>

            {/* Category badge */}
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border flex-shrink-0 ${colorClass}`}>
                {quest.category}
            </span>

            {/* XP reward */}
            <div className="flex items-center gap-1 text-xs font-bold text-[#c8f57a] flex-shrink-0">
                <span>⚡</span>
                <span>+{quest.xpReward}</span>
            </div>
        </div>
    );
}