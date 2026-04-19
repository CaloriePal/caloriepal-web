import { DailyNutritionDto, LogMealRequest, MealLogDto } from '@models/nutrition';
import { fetchDailyNutrition, logMeal } from '@utils/api';
import { useCallback, useEffect, useState } from 'react';

export const useNutrition = () => {
  const [nutrition, setNutrition] = useState<DailyNutritionDto | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await fetchDailyNutrition();
      setNutrition(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleAddMeal = async (req: LogMealRequest) => {
    const newMeal: MealLogDto = await logMeal(req);
    setNutrition(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        meals: [...prev.meals, newMeal],
        calories: prev.calories + newMeal.calories,
        protein: prev.protein + newMeal.protein,
        carbs: prev.carbs + newMeal.carbs,
        fat: prev.fat + newMeal.fat,
      };
    });
  };

  return { nutrition, loading, handleAddMeal };
};
