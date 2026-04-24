import { createClient } from '@utils/supabase/client';
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

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

let _cachedToken: { value: string; expiresAt: number } | null = null;
let _tokenPromise: Promise<string> | null = null;

async function getToken(): Promise<string> {
  if (_cachedToken && _cachedToken.expiresAt > Date.now()) return _cachedToken.value;

  if (!_tokenPromise) {
    _tokenPromise = createClient()
      .auth.getSession()
      .then(({ data }) => {
        const token = data.session?.access_token;
        if (!token) throw new Error('Not authenticated');
        _cachedToken = { value: token, expiresAt: data.session!.expires_at! * 1000 - 60_000 };
        return token;
      })
      .finally(() => {
        _tokenPromise = null;
      });
  }

  return _tokenPromise;
}

async function getAuthHeaders(): Promise<HeadersInit> {
  const token = await getToken();
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
