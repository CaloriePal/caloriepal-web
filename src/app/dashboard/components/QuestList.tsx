import type { DailyQuestsDto, DailyQuestItemDto } from "@models/dashboard";
import QuestCard from "./QuestCard";

interface Props {
    quests: DailyQuestsDto;
    completingId: string | null;
    onComplete: (quest: DailyQuestItemDto) => void;
}

const QuestList = ({ quests, completingId, onComplete }: Props) => {
    return (
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-black uppercase tracking-widest text-white">
                        Daily Quests
                    </h2>
                    <p className="text-zinc-500 text-xs mt-0.5">
                        {quests.completedCount}/{quests.quests.length} completed
                        {quests.totalXpEarned > 0 && ` · +${quests.totalXpEarned} XP earned`}
                    </p>
                </div>
                {/* Progress pill */}
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-lime rounded-full transition-all duration-500"
                            style={{
                                width: `${quests.quests.length > 0 ? (quests.completedCount / quests.quests.length) * 100 : 0}%`
                            }}
                        />
                    </div>
                    <span className="text-xs text-zinc-400 tabular-nums">
                        {quests.quests.length > 0
                            ? Math.round((quests.completedCount / quests.quests.length) * 100)
                            : 0}%
                    </span>
                </div>
            </div>

            {/* Quest cards */}
            <div className="space-y-2">
                {quests.quests.map((quest) => (
                    <QuestCard
                        key={quest.questId}
                        quest={quest}
                        isCompleting={completingId === quest.questId}
                        onComplete={() => onComplete(quest)}
                    />
                ))}
            </div>
        </div>
    );
}

export default QuestList;