import { MealLogDto } from "@models/nutrition";
import MealItem from "./MealItem";

interface MealListProps {
    meals: MealLogDto[];
    onAddMeal: () => void;
}

const MealList = ({ meals, onAddMeal }: MealListProps) => (
    <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
            <div>
                <h2 className="text-cream font-heading font-bold text-lg uppercase tracking-wide">
                    Today&apos;s Meals
                </h2>
                <p className="text-sand text-sm mt-0.5">
                    {meals.length} meal{meals.length !== 1 ? 's' : ''} logged
                </p>
            </div>
            <button
                onClick={onAddMeal}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-lime/50 text-lime text-sm font-semibold hover:bg-lime/10 transition-all"
            >
                + Add Meal
            </button>
        </div>

        {meals.length > 0 ? (
            <div className="space-y-2">
                {meals.map(meal => <MealItem key={meal.id} meal={meal} />)}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-14 text-sand gap-2">
                <span className="text-3xl">🍽️</span>
                <p className="text-sm">No meals logged yet. Add your first meal!</p>
            </div>
        )}
    </div>
);

export default MealList;
