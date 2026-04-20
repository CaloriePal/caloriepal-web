'use client';

import { useState } from 'react';
import { useWorkouts } from './hooks';
import { WorkoutSkeleton, StatCard, SessionList, LogWorkoutModal } from './components';
import type { LogWorkoutRequest } from '@models/workout';

const WorkoutsPage = () => {
    const { stats, loading, handleLogWorkout } = useWorkouts();
    const [showModal, setShowModal] = useState(false);

    const handleLog = async (req: LogWorkoutRequest) => {
        await handleLogWorkout(req);
        setShowModal(false);
    };

    if (loading) return <WorkoutSkeleton />;
    if (!stats) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Weekly Goal"
                    value={`${stats.weeklyCompleted}/${stats.weeklyGoal}`}
                    icon="hugeicons:target-02"
                    color="lime"
                />
                <StatCard
                    label="Total XP"
                    value={stats.totalXp.toLocaleString()}
                    icon="hugeicons:energy"
                    color="gold"
                />
                <StatCard
                    label="Time Trained"
                    value={`${stats.timeTrained}m`}
                    icon="hugeicons:clock-01"
                    color="sky"
                />
                <StatCard
                    label="Sessions"
                    value={stats.sessionCount.toString()}
                    icon="hugeicons:champion"
                    color="rose"
                />
            </div>

            <SessionList
                sessions={stats.recentSessions}
                onAddSession={() => setShowModal(true)}
            />

            {showModal && (
                <LogWorkoutModal
                    onClose={() => setShowModal(false)}
                    onLog={handleLog}
                />
            )}
        </div>
    );
};

export default WorkoutsPage;
