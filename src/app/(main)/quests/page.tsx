'use client';

import { useState } from 'react';
import { useQuests } from './hooks';
import { QuestBoardHeader, QuestRow, QuestsSkeleton } from './components';
import type { DailyQuestItemDto } from '@models/dashboard';

type Filter = 'all' | 'daily';

const FILTERS: { label: string; value: Filter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Daily', value: 'daily' },
];

const QuestsPage = () => {
    const { quests, loading, handleComplete } = useQuests();
    const [filter, setFilter] = useState<Filter>('all');

    if (loading) return <QuestsSkeleton />;
    if (!quests) return null;

    const visible: DailyQuestItemDto[] = filter === 'all'
        ? quests.quests
        : quests.quests;

    const counts = {
        all: quests.quests.length,
        daily: quests.quests.length,
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <QuestBoardHeader quests={quests} />

            <div className="flex items-center gap-2">
                {FILTERS.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => setFilter(value)}
                        className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border transition-all ${filter === value
                                ? 'bg-lime text-black border-lime'
                                : 'bg-card text-sand border-border hover:border-lime/40 hover:text-white'
                            }`}
                    >
                        {label} ({counts[value]})
                    </button>
                ))}
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
                {visible.length === 0 ? (
                    <p className="text-center text-sand text-sm py-8">No quests here yet.</p>
                ) : (
                    visible.map(quest => (
                        <QuestRow
                            key={quest.questId}
                            quest={quest}
                            onComplete={() => handleComplete(quest)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default QuestsPage;
