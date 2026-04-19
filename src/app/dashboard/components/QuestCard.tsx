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
    onComplete: () => void;
}

const QuestCard = ({ quest, onComplete }: Props) => {
    const colorClass = categoryColors[quest.category] ?? "bg-subtle/50 text-muted border-dim/20";

    return (
        <div
            className={`
                flex items-center gap-4 p-4 rounded-xl border transition-all duration-200
                ${quest.isCompleted
                    ? "bg-subtle/40 border-border opacity-60"
                    : "bg-subtle/60 border-border/50 hover:border-dim cursor-pointer"
                }
            `}
            onClick={!quest.isCompleted ? onComplete : undefined}
        >
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                {quest.isCompleted ? (
                    <Icon icon="hugeicons:checkmark-circle-02" width={22} height={22} className="text-lime" />
                ) : (
                    <Icon icon="hugeicons:circle" width={22} height={22} className="text-dim" />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${quest.isCompleted ? "line-through text-sand" : "text-white"}`}>
                    {quest.title}
                </p>
                <p className="text-sand text-xs mt-0.5 truncate">{quest.description}</p>
            </div>

            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border flex-shrink-0 ${colorClass}`}>
                {quest.category}
            </span>

            <div className="flex items-center gap-1 text-xs font-bold text-lime flex-shrink-0">
                <span>⚡</span>
                <span>+{quest.xpReward}</span>
            </div>
        </div>
    );
}

export default QuestCard;
