'use client';

import { useCallback, useEffect, useState } from "react";
import { HeroCard, QuestList, StatsBar, StreakCalendar, ActivityLog } from "./index";
import { DailyQuestItemDto, DailyQuestsDto, PlayerStatsDto } from "@models/dashboard";
import { completeQuest, fetchDailyQuests, fetchPlayerStats } from "@utils/api";

const DashboardClient = () => {
    const [stats, setStats] = useState<PlayerStatsDto | null>(null);
    const [quests, setQuests] = useState<DailyQuestsDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [completingId, setCompletingId] = useState<string | null>(null);
    const [levelUpMsg, setLevelUpMsg] = useState<string | null>(null);

    const loadDashboard = useCallback(async () => {
        try {
            const [s, q] = await Promise.all([fetchPlayerStats(), fetchDailyQuests()]);
            setStats(s);
            setQuests(q);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadDashboard(); }, [loadDashboard]);

    const handleComplete = async (quest: DailyQuestItemDto) => {
        if (quest.isCompleted || completingId) return;
        setCompletingId(quest.questId);
        try {
            const result = await completeQuest(quest.questId);
            if (result.levelsGained > 0) {
                setLevelUpMsg(`Level up! You reached level ${result.newLevel}!`);
                setTimeout(() => setLevelUpMsg(null), 4000);
            }
            await loadDashboard();
        } catch (e) {
            console.error(e);
        } finally {
            setCompletingId(null);
        }
    };

    if (loading) return <DashboardSkeleton />;
    if (!stats || !quests) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-4">
            {levelUpMsg && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-lime text-black px-6 py-3 rounded-full font-bold text-sm animate-bounce">
                    ⚡ {levelUpMsg}
                </div>
            )}
            <HeroCard stats={stats} />
            <StatsBar stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <QuestList quests={quests} completingId={completingId} onComplete={handleComplete} />
                </div>
                <div className="space-y-6">
                    <StreakCalendar streak={stats.currentStreak} longestStreak={stats.longestStreak} freezes={stats.streakFreezes} />
                    <ActivityLog />
                </div>
            </div>
        </div>
    );
}

export default DashboardClient;

function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-surface flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-lime border-t-transparent rounded-full animate-spin" />
                <p className="text-sand text-sm">Loading your stats...</p>
            </div>
        </div>
    );
}
