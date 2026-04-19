'use client';

import { HeroCard, QuestList, StatsBar, StreakCalendar, ActivityLog, DashboardSkeleton } from "./components";
import { useDashboard } from "./hooks";

const DashboardPage = () => {
    const { stats, quests, activityLog, loading, levelUpMsg, handleComplete } = useDashboard();

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
                    <QuestList quests={quests} onComplete={handleComplete} />
                </div>
                <div className="space-y-6">
                    <StreakCalendar streak={stats.currentStreak} longestStreak={stats.longestStreak} freezes={stats.streakFreezes} />
                    <ActivityLog entries={activityLog} />
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
