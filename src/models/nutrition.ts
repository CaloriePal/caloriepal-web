export type MealCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export interface FoodItemDto {
    id: string;
    name: string;
    caloriesPer100g: number;
    proteinPer100g: number;
    carbsPer100g: number;
    fatPer100g: number;
}

export interface MealLogDto {
    id: string;
    foodName: string;
    category: MealCategory;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    loggedAt: string;
}

export interface DailyNutritionDto {
    date: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meals: MealLogDto[];
}

export type LogMealRequest =
    | { category: MealCategory; foodItemId: string; quantityGrams: number }
    | { category: MealCategory; manualName: string; manualCalories: number; manualProtein: number; manualCarbs: number; manualFat: number };
