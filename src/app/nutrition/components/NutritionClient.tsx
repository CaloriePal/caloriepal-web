'use client';

import { useCallback, useEffect, useState } from "react";
import { DailyNutritionDto, LogMealRequest, MealLogDto } from "@models/nutrition";
import { fetchDailyNutrition, logMeal } from "@utils/api";
import MacroCard from "./MacroCard";
import MealList from "./MealList";
import AddMealModal from "./AddMealModal";

const GOALS = { calories: 2400, protein: 150, carbs: 280, fat: 70 };

const NutritionClient = () => {
    const [nutrition, setNutrition] = useState<DailyNutritionDto | null>(null);
    const [loading, setLoading]     = useState(true);
    const [showModal, setShowModal] = useState(false);

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

    useEffect(() => { load(); }, [load]);

    const handleAddMeal = async (req: LogMealRequest) => {
        const newMeal: MealLogDto = await logMeal(req);
        setNutrition(prev => {
            if (!prev) return prev;
            const meals = [...prev.meals, newMeal];
            return {
                ...prev,
                meals,
                calories: prev.calories + newMeal.calories,
                protein:  prev.protein  + newMeal.protein,
                carbs:    prev.carbs    + newMeal.carbs,
                fat:      prev.fat      + newMeal.fat,
            };
        });
        setShowModal(false);
    };

    if (loading) return <NutritionSkeleton />;
    if (!nutrition) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MacroCard label="Calories" icon="🔥" consumed={Math.round(nutrition.calories)} goal={GOALS.calories} unit="kcal" color="lime" />
                <MacroCard label="Protein"  icon="💧" consumed={Math.round(nutrition.protein)}  goal={GOALS.protein}  unit="g"    color="sky"  />
                <MacroCard label="Carbs"    icon="⚡" consumed={Math.round(nutrition.carbs)}    goal={GOALS.carbs}    unit="g"    color="gold" />
                <MacroCard label="Fat"      icon="🫧" consumed={Math.round(nutrition.fat)}      goal={GOALS.fat}      unit="g"    color="rose" />
            </div>

            <MealList meals={nutrition.meals} onAddMeal={() => setShowModal(true)} />

            {showModal && (
                <AddMealModal onClose={() => setShowModal(false)} onAdd={handleAddMeal} />
            )}
        </div>
    );
};

export default NutritionClient;

function NutritionSkeleton() {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse">
                        <div className="h-3 w-20 bg-subtle rounded mb-4" />
                        <div className="h-8 w-24 bg-subtle rounded mb-4" />
                        <div className="h-1.5 bg-subtle rounded-full" />
                    </div>
                ))}
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 animate-pulse">
                <div className="h-5 w-40 bg-subtle rounded mb-6" />
                <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-16 bg-subtle rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}
