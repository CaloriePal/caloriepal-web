import type {
  PlayerStatsDto,
  DailyQuestsDto,
  CompleteQuestResult,
  ActivityLogEntryDto,
  PurchaseStreakFreezeResult,
} from '@models/dashboard';
import type { DailyNutritionDto, FoodItemDto, MealLogDto, LogMealRequest } from '@models/nutrition';
import type {
  WorkoutStatsDto,
  WorkoutSessionDto,
  LogWorkoutRequest,
  ExerciseDto,
} from '@models/workout';
import { createClient } from './supabase/client';

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

async function getAuthHeaders(): Promise<HeadersInit> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error('Not authenticated');

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export async function fetchPlayerStats(): Promise<PlayerStatsDto> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/players/me/stats`, { headers });
  if (!res.ok) throw new Error('Failed to fetch player stats');
  return res.json();
}

export async function fetchDailyQuests(): Promise<DailyQuestsDto> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/quests/daily`, { headers });
  if (!res.ok) throw new Error('Failed to fetch daily quests');
  return res.json();
}

export async function fetchActivityLog(): Promise<ActivityLogEntryDto[]> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/players/me/activity-log`, { headers });
  if (!res.ok) throw new Error('Failed to fetch activity log');
  return res.json();
}

export async function completeQuest(questId: string): Promise<CompleteQuestResult> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/quests/${questId}/complete`, {
    method: 'POST',
    headers,
  });
  if (!res.ok) throw new Error('Failed to complete quest');
  return res.json();
}

export async function fetchDailyNutrition(): Promise<DailyNutritionDto> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/Nutrition/daily`, { headers });
  if (!res.ok) throw new Error('Failed to fetch daily nutrition');
  return res.json();
}

export async function logMeal(req: LogMealRequest): Promise<MealLogDto> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/Nutrition/meals`, {
    method: 'POST',
    headers,
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Failed to log meal');
  return res.json();
}

export async function searchFoods(term: string): Promise<FoodItemDto[]> {
  const headers = await getAuthHeaders();
  const res = await fetch(
    `${API_BASE}/api/Nutrition/foods/search?term=${encodeURIComponent(term)}`,
    { headers }
  );
  if (!res.ok) throw new Error('Failed to search foods');
  return res.json();
}

export async function fetchWorkoutStats(): Promise<WorkoutStatsDto> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/Workouts/stats`, { headers });
  if (!res.ok) throw new Error('Failed to fetch workout stats');
  return res.json();
}

export async function logWorkout(req: LogWorkoutRequest): Promise<WorkoutSessionDto> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/Workouts/sessions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Failed to log workout');
  return res.json();
}

export async function searchExercises(term: string): Promise<ExerciseDto[]> {
  const headers = await getAuthHeaders();
  const res = await fetch(
    `${API_BASE}/api/Workouts/exercises/search?term=${encodeURIComponent(term)}`,
    { headers }
  );
  if (!res.ok) throw new Error('Failed to search exercises');
  return res.json();
}

export async function purchaseStreakFreeze(): Promise<PurchaseStreakFreezeResult> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/Shop/purchase-streak-freeze`, {
    method: 'GET',
    headers,
  });
  if (!res.ok) throw new Error('Failed to purchase streak freeze');
  return res.json();
}
