"use client";

import { Icon } from "@iconify/react";
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

const QuestCard = ({ quest, isCompleting, onComplete }: Props) => {
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
            {/* Status icon */}
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                {quest.isCompleted ? (
                    <Icon icon="hugeicons:checkmark-circle-02" width={22} height={22} className="text-lime" />
                ) : isCompleting ? (
                    <Icon icon="hugeicons:loading-03" width={22} height={22} className="text-lime animate-spin" />
                ) : (
                    <Icon icon="hugeicons:circle" width={22} height={22} className="text-zinc-600" />
                )}
            </div>

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
            <div className="flex items-center gap-1 text-xs font-bold text-lime flex-shrink-0">
                <span>⚡</span>
                <span>+{quest.xpReward}</span>
            </div>
        </div>
    );
}

export default QuestCard;
