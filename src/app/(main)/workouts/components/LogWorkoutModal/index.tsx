'use client';

import { useLogWorkoutForm } from './hooks';
import { CategorySelector, ExerciseSearchInput, ExerciseList, ModalActions } from './components';
import type { LogWorkoutRequest } from '@models/workout';

interface Props {
    onClose: () => void;
    onLog: (req: LogWorkoutRequest) => Promise<void>;
}

const LogWorkoutModal = ({ onClose, onLog }: Props) => {
    const form = useLogWorkoutForm(onLog);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-card border border-border rounded-2xl w-full max-w-lg mx-4 shadow-2xl max-h-[88vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
                    <h3 className="font-heading font-bold text-cream text-lg">Log Workout</h3>
                    <button onClick={onClose} className="text-sand hover:text-cream transition-colors text-xl leading-none">✕</button>
                </div>

                <form onSubmit={form.handleSubmit} className="flex flex-col flex-1 min-h-0">
                    <div className="overflow-y-auto flex-1 px-6 space-y-4 pb-2">
                        <div>
                            <label className="text-xs text-sand uppercase tracking-widest font-semibold block mb-1.5">
                                Workout Name
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={e => form.setName(e.target.value)}
                                placeholder="e.g. Push Day, Morning Run..."
                                className="w-full bg-subtle border border-border rounded-xl px-4 py-2.5 text-cream text-sm placeholder:text-dim focus:outline-none focus:border-lime/50 transition-colors"
                                autoFocus
                            />
                        </div>

                        <CategorySelector value={form.category} onChange={form.setCategory} />

                        <div>
                            <label className="text-xs text-sand uppercase tracking-widest font-semibold block mb-1.5">
                                Duration (minutes)
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={form.duration}
                                onChange={e => form.setDuration(e.target.value)}
                                placeholder="e.g. 60"
                                className="w-full bg-subtle border border-border rounded-xl px-4 py-2.5 text-cream text-sm placeholder:text-dim focus:outline-none focus:border-lime/50 transition-colors"
                            />
                        </div>

                        <ExerciseSearchInput
                            category={form.category}
                            pending={form.pending}
                            onPendingChange={form.setPending}
                            onAddExercise={form.addExercise}
                        />

                        <ExerciseList exercises={form.exercises} onRemove={form.removeExercise} />
                    </div>

                    <div className="px-6 py-4 border-t border-border shrink-0">
                        <ModalActions onClose={onClose} canSubmit={form.canSubmit} submitting={form.submitting} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogWorkoutModal;
