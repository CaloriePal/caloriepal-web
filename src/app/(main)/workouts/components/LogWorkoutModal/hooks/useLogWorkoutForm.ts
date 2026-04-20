import { useState } from 'react';
import type { WorkoutCategory, LogWorkoutRequest, WorkoutExerciseEntry } from '@models/workout';

export interface PendingExercise {
    exerciseId?: string;
    exerciseName: string;
    sets: string;
    reps: string;
    weightKg: string;
    durationMinutes: string;
    distanceKm: string;
}

const EMPTY_PENDING: PendingExercise = {
    exerciseName: '',
    sets: '',
    reps: '',
    weightKg: '',
    durationMinutes: '',
    distanceKm: '',
};

export const useLogWorkoutForm = (onLog: (req: LogWorkoutRequest) => Promise<void>) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState<WorkoutCategory>('Strength');
    const [duration, setDuration] = useState('');
    const [exercises, setExercises] = useState<WorkoutExerciseEntry[]>([]);
    const [pending, setPending] = useState<PendingExercise>(EMPTY_PENDING);
    const [submitting, setSubmitting] = useState(false);

    const addExercise = () => {
        if (!pending.exerciseName.trim()) return;
        const entry: WorkoutExerciseEntry = {
            exerciseId: pending.exerciseId,
            exerciseName: pending.exerciseName.trim(),
            sets: pending.sets ? Number(pending.sets) : undefined,
            reps: pending.reps ? Number(pending.reps) : undefined,
            weightKg: pending.weightKg ? Number(pending.weightKg) : undefined,
            durationMinutes: pending.durationMinutes ? Number(pending.durationMinutes) : undefined,
            distanceKm: pending.distanceKm ? Number(pending.distanceKm) : undefined,
        };
        setExercises(prev => [...prev, entry]);
        setPending(EMPTY_PENDING);
    };

    const removeExercise = (index: number) => {
        setExercises(prev => prev.filter((_, i) => i !== index));
    };

    const canSubmit =
        !submitting &&
        name.trim().length > 0 &&
        Number(duration) > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        setSubmitting(true);
        try {
            await onLog({
                name: name.trim(),
                category,
                durationMinutes: Number(duration),
                exercises,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return {
        name, setName,
        category, setCategory,
        duration, setDuration,
        exercises,
        pending, setPending,
        addExercise,
        removeExercise,
        submitting,
        canSubmit,
        handleSubmit,
    };
};
