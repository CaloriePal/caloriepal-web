'use client';

import { useCallback, useEffect, useState } from 'react';
import type { DailyQuestItemDto, DailyQuestsDto } from '@models/dashboard';
import { completeQuest, fetchDailyQuests } from '@utils/api';

export const useQuests = () => {
    const [quests, setQuests] = useState<DailyQuestsDto | null>(null);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        try {
            const data = await fetchDailyQuests();
            setQuests(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const handleComplete = async (quest: DailyQuestItemDto) => {
        if (quest.isCompleted) return;

        setQuests(prev => {
            if (!prev) return prev;
            const updated = prev.quests.map(q =>
                q.questId === quest.questId ? { ...q, isCompleted: true } : q
            );
            return {
                ...prev,
                quests: updated,
                completedCount: updated.filter(q => q.isCompleted).length,
                totalXpEarned: prev.totalXpEarned + quest.xpReward,
                totalCoinsEarned: prev.totalCoinsEarned + quest.coinReward,
            };
        });

        try {
            await completeQuest(quest.questId);
        } catch (e) {
            console.error(e);
            await load();
        }
    };

    return { quests, loading, handleComplete };
};
