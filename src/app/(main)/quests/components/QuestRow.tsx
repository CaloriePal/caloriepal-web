'use client';

import { Icon } from '@iconify/react';
import type { DailyQuestItemDto } from '@models/dashboard';

const categoryColors: Record<DailyQuestItemDto['category'], string> = {
    Training: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Nutrition: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Mindset: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

interface Props {
    quest: DailyQuestItemDto;
    onComplete: () => void;
}

const QuestRow = ({ quest, onComplete }: Props) => {
    const colorClass = categoryColors[quest.category];
    const done = quest.isCompleted;

    return (
        <div
            onClick={!done ? onComplete : undefined}
            className={`p-4 rounded-xl border transition-all duration-200 space-y-3 ${done
                    ? 'bg-subtle/40 border-border opacity-60'
                    : 'bg-subtle/60 border-border/50 hover:border-lime/30 cursor-pointer'
                }`}
        >
            <div className="flex items-center gap-3">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                    {done ? (
                        <Icon icon="hugeicons:checkmark-circle-02" width={22} height={22} className="text-lime" />
                    ) : (
                        <Icon icon="hugeicons:circle" width={22} height={22} className="text-dim" />
                    )}
                </div>

                <p className={`flex-1 text-sm font-semibold ${done ? 'line-through text-sand' : 'text-white'}`}>
                    {quest.title}
                </p>

                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border bg-lime/10 text-lime border-lime/20 shrink-0">
                    Daily
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border shrink-0 ${colorClass}`}>
                    {quest.category}
                </span>
            </div>

            <p className="text-sand text-xs pl-9">{quest.description}</p>

            <div className="pl-9 flex items-center gap-4">
                <div className="flex-1 space-y-1">
                    <p className="text-[10px] text-muted">
                        Progress: <span className="text-sand font-semibold">{done ? '1/1' : '0/1'}</span>
                    </p>
                    <div className="h-1.5 w-full bg-subtle rounded-full overflow-hidden">
                        <div
                            className="h-full bg-lime rounded-full transition-all duration-500"
                            style={{ width: done ? '100%' : '0%' }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs font-bold">
                    <span className="text-lime flex items-center gap-1">⚡<span>+{quest.xpReward}</span></span>
                    <span className="text-gold flex items-center gap-1">
                        <Icon icon="hugeicons:coins-02" className="w-3.5 h-3.5" />
                        <span>+{quest.coinReward}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default QuestRow;
