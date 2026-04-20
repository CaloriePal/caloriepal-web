export type WorkoutCategory = 'Strength' | 'Cardio';

export interface ExerciseDto {
  id: string;
  name: string;
  category: WorkoutCategory;
  muscleGroup?: string;
}

export interface WorkoutExerciseDto {
  exerciseName: string;
  sets?: number;
  reps?: number;
  weightKg?: number;
  durationMinutes?: number;
  distanceKm?: number;
}

export interface WorkoutSessionDto {
  id: string;
  name: string;
  category: WorkoutCategory;
  durationMinutes: number;
  xpAwarded: number;
  exercises: WorkoutExerciseDto[];
  loggedAt: string;
}

export interface WorkoutStatsDto {
  weeklyGoal: number;
  weeklyCompleted: number;
  totalXp: number;
  timeTrained: number;
  sessionCount: number;
  recentSessions: WorkoutSessionDto[];
}

export interface WorkoutExerciseEntry {
  exerciseId?: string;
  exerciseName: string;
  sets?: number;
  reps?: number;
  weightKg?: number;
  durationMinutes?: number;
  distanceKm?: number;
}

export interface LogWorkoutRequest {
  name: string;
  category: WorkoutCategory;
  durationMinutes: number;
  exercises: WorkoutExerciseEntry[];
}
