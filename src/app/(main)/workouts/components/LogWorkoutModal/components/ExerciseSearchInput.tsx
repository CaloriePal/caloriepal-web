import type { ExerciseDto, WorkoutCategory } from '@models/workout';
import { PendingExercise, useExerciseSearch } from '../hooks';

const STRENGTH_FIELDS: WorkoutCategory[] = ['Strength'];
const CARDIO_FIELDS: WorkoutCategory[] = ['Cardio'];

interface Props {
    category: WorkoutCategory;
    pending: PendingExercise;
    onPendingChange: (p: PendingExercise) => void;
    onAddExercise: () => void;
}

const ExerciseSearchInput = ({ category, pending, onPendingChange, onAddExercise }: Props) => {
    const isSearchMode = !pending.exerciseId && pending.exerciseName.trim().length > 0;
    const search = useExerciseSearch(pending.exerciseName, isSearchMode);

    const set = (field: keyof PendingExercise, value: string) =>
        onPendingChange({ ...pending, [field]: value });

    const handleSelect = (ex: ExerciseDto) => {
        onPendingChange({ ...pending, exerciseId: ex.id, exerciseName: ex.name });
        search.setShowDropdown(false);
    };

    const handleClear = () => {
        onPendingChange({ exerciseName: '', sets: '', reps: '', weightKg: '', durationMinutes: '', distanceKm: '' });
        search.setShowDropdown(false);
    };

    const showStrengthFields = STRENGTH_FIELDS.includes(category);
    const showCardioFields = CARDIO_FIELDS.includes(category);

    return (
        <div className="border border-border rounded-xl p-4 space-y-3">
            <label className="text-xs text-sand uppercase tracking-widest font-semibold block">Add Exercise</label>

            <div className="relative">
                {pending.exerciseId ? (
                    <div className="flex items-center gap-3 px-4 py-2.5 bg-subtle border border-lime/40 rounded-xl">
                        <span className="text-cream text-sm flex-1">{pending.exerciseName}</span>
                        <button type="button" onClick={handleClear} className="text-dim hover:text-sand text-xs">✕</button>
                    </div>
                ) : (
                    <div className="relative">
                        <input
                            type="text"
                            value={pending.exerciseName}
                            onChange={e => set('exerciseName', e.target.value)}
                            onFocus={() => search.results.length > 0 && search.setShowDropdown(true)}
                            placeholder="Search or type exercise name..."
                            className="w-full bg-subtle border border-border rounded-xl px-4 py-2.5 text-cream text-sm placeholder:text-dim focus:outline-none focus:border-lime/50 transition-colors pr-8"
                        />
                        {search.isSearching && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-lime border-t-transparent rounded-full animate-spin" />
                        )}
                    </div>
                )}

                {search.showDropdown && !pending.exerciseId && (
                    <div className="absolute z-10 mt-1 w-full bg-card border border-border rounded-xl shadow-xl overflow-hidden">
                        {search.results.length > 0 ? (
                            search.results.map(ex => (
                                <button key={ex.id} type="button" onClick={() => handleSelect(ex)}
                                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-subtle transition-colors text-left">
                                    <span className="text-cream text-sm">{ex.name}</span>
                                    {ex.muscleGroup && <span className="text-sand text-xs">{ex.muscleGroup}</span>}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3">
                                <p className="text-sand text-sm">No results — using custom name</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {pending.exerciseName.trim() && (
                <div className="grid grid-cols-3 gap-2">
                    {showStrengthFields && (
                        <>
                            <div>
                                <label className="text-[10px] text-dim uppercase tracking-wider block mb-1">Sets</label>
                                <input type="number" min="1" value={pending.sets} onChange={e => set('sets', e.target.value)}
                                    placeholder="e.g. 4"
                                    className="w-full bg-subtle border border-border rounded-lg px-3 py-2 text-cream text-sm placeholder:text-dim focus:outline-none focus:border-lime/50 transition-colors" />
                            </div>
                            <div>
                                <label className="text-[10px] text-dim uppercase tracking-wider block mb-1">Reps</label>
                                <input type="number" min="1" value={pending.reps} onChange={e => set('reps', e.target.value)}
                                    placeholder="e.g. 8"
                                    className="w-full bg-subtle border border-border rounded-lg px-3 py-2 text-cream text-sm placeholder:text-dim focus:outline-none focus:border-lime/50 transition-colors" />
                            </div>
                            <div>
                                <label className="text-[10px] text-dim uppercase tracking-wider block mb-1">Weight (kg)</label>
                                <input type="number" min="0" step="0.5" value={pending.weightKg} onChange={e => set('weightKg', e.target.value)}
                                    placeholder="e.g. 80"
                                    className="w-full bg-subtle border border-border rounded-lg px-3 py-2 text-cream text-sm placeholder:text-dim focus:outline-none focus:border-lime/50 transition-colors" />
                            </div>
                        </>
                    )}
                    {showCardioFields && (
                        <>
                            <div>
                                <label className="text-[10px] text-dim uppercase tracking-wider block mb-1">Duration (min)</label>
                                <input type="number" min="1" value={pending.durationMinutes} onChange={e => set('durationMinutes', e.target.value)}
                                    placeholder="e.g. 30"
                                    className="w-full bg-subtle border border-border rounded-lg px-3 py-2 text-cream text-sm placeholder:text-dim focus:outline-none focus:border-lime/50 transition-colors" />
                            </div>
                            <div>
                                <label className="text-[10px] text-dim uppercase tracking-wider block mb-1">Distance (km)</label>
                                <input type="number" min="0" step="0.1" value={pending.distanceKm} onChange={e => set('distanceKm', e.target.value)}
                                    placeholder="e.g. 5"
                                    className="w-full bg-subtle border border-border rounded-lg px-3 py-2 text-cream text-sm placeholder:text-dim focus:outline-none focus:border-lime/50 transition-colors" />
                            </div>
                        </>
                    )}
                </div>
            )}

            <button
                type="button"
                onClick={onAddExercise}
                disabled={!pending.exerciseName.trim()}
                className="w-full py-2 rounded-xl border border-lime/40 text-lime text-sm font-semibold hover:bg-lime/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
                + Add to Workout
            </button>
        </div>
    );
};

export default ExerciseSearchInput;
