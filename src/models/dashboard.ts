export interface PlayerStatsDto {
  profileId: string;
  displayName: string;
  avatarUrl: string | null;
  totalXp: number;
  level: number;
  title: string;
  xpIntoCurrentLevel: number;
  xpRequiredForNextLevel: number;
  coins: number;
  currentStreak: number;
  longestStreak: number;
  streakFreezes: number;
  questsDoneThisMonth: number;
}

export interface DailyQuestItemDto {
  questId: string;
  title: string;
  description: string;
  category: 'Training' | 'Nutrition' | 'Mindset';
  xpReward: number;
  coinReward: number;
  isCompleted: boolean;
}

export interface DailyQuestsDto {
  quests: DailyQuestItemDto[];
  completedCount: number;
  totalXpEarned: number;
  totalCoinsEarned: number;
}

export interface CompleteQuestResult {
  xpAwarded: number;
  coinsAwarded: number;
  newTotalXp: number;
  newLevel: number;
  levelsGained: number;
  newStreak: number;
  streakOutcome: string;
  totalCoins: number;
}
