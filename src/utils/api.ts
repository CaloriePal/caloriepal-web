import { createClient } from '@utils/supabase/client';
import type { PlayerStatsDto, DailyQuestsDto, CompleteQuestResult } from '@models/dashboard';

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

export async function completeQuest(questId: string): Promise<CompleteQuestResult> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/quests/${questId}/complete`, {
    method: 'POST',
    headers,
  });
  if (!res.ok) throw new Error('Failed to complete quest');
  return res.json();
}
