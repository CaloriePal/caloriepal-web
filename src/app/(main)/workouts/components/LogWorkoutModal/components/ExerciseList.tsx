import type { WorkoutExerciseEntry } from '@models/workout';

function formatEntry(ex: WorkoutExerciseEntry): string {
    if (ex.sets && ex.reps && ex.weightKg) return `${ex.sets}×${ex.reps} @ ${ex.weightKg}kg`;
    if (ex.sets && ex.reps) return `${ex.sets}×${ex.reps}`;
    if (ex.durationMinutes && ex.distanceKm) return `${ex.durationMinutes}min / ${ex.distanceKm}km`;
    if (ex.durationMinutes) return `${ex.durationMinutes}min`;
    if (ex.distanceKm) return `${ex.distanceKm}km`;
    return '';
}

interface Props {
    exercises: WorkoutExerciseEntry[];
    onRemove: (index: number) => void;
}

const ExerciseList = ({ exercises, onRemove }: Props) => {
    if (exercises.length === 0) return null;

    return (
        <div className="space-y-1.5">
            <label className="text-xs text-sand uppercase tracking-widest font-semibold block">
                Exercises ({exercises.length})
            </label>
            {exercises.map((ex, i) => {
                const stat = formatEntry(ex);
                return (
                    <div key={i} className="flex items-center justify-between bg-subtle border border-border rounded-xl px-4 py-2.5 group">
                        <span className="text-cream text-sm">
                            {ex.exerciseName}
                            {stat && <span className="text-sand ml-2">{stat}</span>}
                        </span>
                        <button
                            type="button"
                            onClick={() => onRemove(i)}
                            className="text-dim hover:text-rose text-xs transition-colors ml-2 opacity-0 group-hover:opacity-100"
                            aria-label="Remove exercise"
                        >
                            ✕
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default ExerciseList;
