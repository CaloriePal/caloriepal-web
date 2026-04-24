import { useState, useCallback, useEffect } from 'react';
import { fetchWorkoutStats, logWorkout } from '@utils/api';
import type { WorkoutStatsDto, LogWorkoutRequest } from '@models/workout';

export const useWorkouts = () => {
  const [stats, setStats] = useState<WorkoutStatsDto | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await fetchWorkoutStats();
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleLogWorkout = async (req: LogWorkoutRequest) => {
    const session = await logWorkout(req);
    setStats(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        weeklyCompleted: prev.weeklyCompleted + 1,
        totalXp: prev.totalXp + session.xpAwarded,
        timeTrained: prev.timeTrained + session.durationMinutes,
        sessionCount: prev.sessionCount + 1,
        recentSessions: [session, ...prev.recentSessions],
      };
    });
  };

  return { stats, loading, handleLogWorkout };
};
