'use client';

import { useState } from "react";
import { MacroCard, MealList, AddMealModal, NutritionSkeleton } from "./components";
import { useNutrition } from "./hooks";
import { GOALS } from "./constants";

const NutritionPage = () => {
    const { nutrition, loading, handleAddMeal } = useNutrition();
    const [showModal, setShowModal] = useState(false);

    if (loading) return <NutritionSkeleton />;
    if (!nutrition) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MacroCard label="Calories" icon="🔥" consumed={Math.round(nutrition.calories)} goal={GOALS.calories} unit="kcal" color="lime" />
                <MacroCard label="Protein" icon="💧" consumed={Math.round(nutrition.protein)} goal={GOALS.protein} unit="g" color="sky" />
                <MacroCard label="Carbs" icon="⚡" consumed={Math.round(nutrition.carbs)} goal={GOALS.carbs} unit="g" color="gold" />
                <MacroCard label="Fat" icon="🫧" consumed={Math.round(nutrition.fat)} goal={GOALS.fat} unit="g" color="rose" />
            </div>

            <MealList meals={nutrition.meals} onAddMeal={() => setShowModal(true)} />

            {showModal && (
                <AddMealModal onClose={() => setShowModal(false)} onAdd={handleAddMeal} />
            )}
        </div>
    );
};

export default NutritionPage;
