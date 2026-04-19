import { MealLogDto, MealCategory } from "@models/nutrition";

const ICONS: Record<MealCategory, string> = {
    Breakfast: '🥣',
    Lunch:     '🥗',
    Dinner:    '🍗',
    Snack:     '🍌',
};

const ICON_BG: Record<MealCategory, string> = {
    Breakfast: 'bg-lime/10 text-lime',
    Lunch:     'bg-sky/10 text-sky',
    Dinner:    'bg-rose/10 text-rose',
    Snack:     'bg-gold/10 text-gold',
};

function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const MealItem = ({ meal }: { meal: MealLogDto }) => {
    const icon   = ICONS[meal.category]   ?? '🍽️';
    const iconBg = ICON_BG[meal.category] ?? 'bg-subtle text-cream';

    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-subtle/30 border border-border/60 hover:border-border transition-all">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${iconBg}`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                    <span className="text-cream font-semibold text-sm truncate">{meal.foodName}</span>
                    <span className="text-sand text-xs flex-shrink-0">{formatTime(meal.loggedAt)}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs">
                    <span className="text-lime font-bold">{Math.round(meal.calories)} kcal</span>
                    <span className="text-sand">P: <span className="text-sky font-semibold">{Math.round(meal.protein)}g</span></span>
                    <span className="text-sand">C: <span className="text-gold font-semibold">{Math.round(meal.carbs)}g</span></span>
                    <span className="text-sand">F: <span className="text-rose font-semibold">{Math.round(meal.fat)}g</span></span>
                </div>
            </div>
        </div>
    );
};

export default MealItem;
