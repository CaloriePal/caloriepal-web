import { useCallback, useEffect, useState } from 'react';
import {
  ActivityLogEntryDto,
  DailyQuestItemDto,
  DailyQuestsDto,
  PlayerStatsDto,
} from '@models/dashboard';
import { completeQuest, fetchActivityLog, fetchDailyQuests, fetchPlayerStats } from '@utils/api';

export const useDashboard = () => {
  const [stats, setStats] = useState<PlayerStatsDto | null>(null);
  const [quests, setQuests] = useState<DailyQuestsDto | null>(null);
  const [activityLog, setActivityLog] = useState<ActivityLogEntryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [levelUpMsg, setLevelUpMsg] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      const [s, q, log] = await Promise.all([
        fetchPlayerStats(),
        fetchDailyQuests(),
        fetchActivityLog(),
      ]);
      setStats(s);
      setQuests(q);
      setActivityLog(log);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

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
      const result = await completeQuest(quest.questId);
      if (result.levelsGained > 0) {
        setLevelUpMsg(`Level up! You reached level ${result.newLevel}!`);
        setTimeout(() => setLevelUpMsg(null), 4000);
        await loadDashboard();
      } else {
        fetchActivityLog().then(setActivityLog);
      }
    } catch (e) {
      console.error(e);
      await loadDashboard();
    }
  };

  return { stats, quests, activityLog, loading, levelUpMsg, handleComplete };
};
