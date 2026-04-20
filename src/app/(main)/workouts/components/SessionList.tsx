import type { WorkoutSessionDto } from '@models/workout';
import { SessionItem } from '../components';

interface Props {
    sessions: WorkoutSessionDto[];
    onAddSession: () => void;
}

const SessionList = ({ sessions, onAddSession }: Props) => (
    <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
                <span className="text-sky text-base">↗</span>
                <h2 className="font-heading font-bold text-cream text-sm uppercase tracking-widest">Recent Sessions</h2>
            </div>
            <button
                onClick={onAddSession}
                className="flex items-center gap-1.5 bg-lime text-black text-sm font-bold px-4 py-2 rounded-xl hover:bg-lime-light transition-colors"
            >
                + Log Workout
            </button>
        </div>

        {sessions.length > 0 ? (
            <div className="space-y-3">
                {sessions.map(session => (
                    <SessionItem key={session.id} session={session} />
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-14 text-sand gap-2">
                <span className="text-3xl">🏋️</span>
                <p className="text-sm">No sessions logged yet</p>
                <p className="text-xs text-dim">Log your first workout to start earning XP</p>
            </div>
        )}
    </div>
);

export default SessionList;
