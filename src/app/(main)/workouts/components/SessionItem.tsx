import { Icon } from '@iconify/react';
import type { WorkoutSessionDto, WorkoutCategory, WorkoutExerciseDto } from '@models/workout';

const CATEGORY_STYLES: Record<WorkoutCategory, { bg: string; text: string; icon: string; border: string }> = {
    Strength: { bg: 'bg-sky/10', text: 'text-sky', icon: 'hugeicons:dumbbell-01', border: 'border-sky/20' },
    Cardio: { bg: 'bg-lime/10', text: 'text-lime', icon: 'hugeicons:activity-01', border: 'border-lime/20' }
};

function formatExercise(ex: WorkoutExerciseDto): string {
    if (ex.sets && ex.reps && ex.weightKg) return `${ex.sets}×${ex.reps} @ ${ex.weightKg}kg`;
    if (ex.sets && ex.reps) return `${ex.sets}×${ex.reps}`;
    if (ex.durationMinutes && ex.distanceKm) return `${ex.durationMinutes}min / ${ex.distanceKm}km`;
    if (ex.durationMinutes) return `${ex.durationMinutes}min`;
    if (ex.distanceKm) return `${ex.distanceKm}km`;
    return '';
}

function formatDate(loggedAt: string): string {
    const d = new Date(loggedAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface Props {
    session: WorkoutSessionDto;
}

const SessionItem = ({ session }: Props) => {
    const style = CATEGORY_STYLES[session.category];

    return (
        <div className={`bg-subtle border ${style.border} rounded-xl p-4`}>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className={`${style.bg} rounded-lg p-2 shrink-0`}>
                        <Icon icon={style.icon} className={`text-lg ${style.text}`} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-heading font-bold text-cream text-sm">{session.name}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${style.bg} ${style.text}`}>
                                {session.category}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-sand">
                            <span>{formatDate(session.loggedAt)}</span>
                            <span>⏱ {session.durationMinutes}m</span>
                            <span className="text-gold">⚡ +{session.xpAwarded} XP</span>
                        </div>
                    </div>
                </div>
            </div>

            {session.exercises.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {session.exercises.map((ex, i) => {
                        const stat = formatExercise(ex);
                        return (
                            <span key={i} className="bg-card border border-border text-sand text-xs px-3 py-1 rounded-lg">
                                <span className="text-cream font-medium">{ex.exerciseName}</span>
                                {stat && <span> {stat}</span>}
                            </span>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SessionItem;
