import { Icon } from '@iconify/react';
import type { DailyQuestsDto } from '@models/dashboard';

interface Props {
    quests: DailyQuestsDto;
}

const QuestBoardHeader = ({ quests }: Props) => (
    <div className="bg-card border border-border rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center shrink-0">
                <Icon icon="hugeicons:task-01" className="w-6 h-6 text-lime" />
            </div>
            <div>
                <h1 className="text-2xl font-black tracking-widest uppercase font-heading text-white">
                    Quest Board
                </h1>
                <p className="text-sand text-sm mt-0.5">Embark on challenges. Earn XP. Forge your legend.</p>
            </div>
        </div>

        <div className="flex items-center gap-3">
            <div className="bg-surface border border-border rounded-xl px-4 py-2.5 text-center">
                <p className="text-white text-xl font-black leading-none">{quests.completedCount}</p>
                <p className="text-sand text-[10px] uppercase tracking-widest font-semibold mt-0.5">Done</p>
            </div>
            <div className="bg-surface border border-lime/20 rounded-xl px-4 py-2.5 text-center">
                <p className="text-lime text-xl font-black leading-none">⚡{quests.totalXpEarned}</p>
                <p className="text-sand text-[10px] uppercase tracking-widest font-semibold mt-0.5">XP Earned</p>
            </div>
            <div className="bg-surface border border-gold/20 rounded-xl px-4 py-2.5 text-center">
                <div className="flex items-center gap-1.5 justify-center">
                    <Icon icon="hugeicons:coins-02" className="w-4 h-4 text-gold" />
                    <p className="text-gold text-xl font-black leading-none">{quests.totalCoinsEarned}</p>
                </div>
                <p className="text-sand text-[10px] uppercase tracking-widest font-semibold mt-0.5">Coins</p>
            </div>
        </div>
    </div>
);

export default QuestBoardHeader;
