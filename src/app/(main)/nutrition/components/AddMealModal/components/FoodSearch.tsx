import { FoodItemDto } from "@models/nutrition";

interface FoodSearchProps {
    searchTerm: string;
    setSearchTerm: (v: string) => void;
    selectedFood: FoodItemDto | null;
    onSelectFood: (food: FoodItemDto) => void;
    onClearFood: () => void;
    onManualMode: () => void;
    results: FoodItemDto[];
    isSearching: boolean;
    showDropdown: boolean;
    setShowDropdown: (v: boolean) => void;
}

const FoodSearch = ({
    searchTerm, setSearchTerm,
    selectedFood, onSelectFood, onClearFood, onManualMode,
    results, isSearching, showDropdown, setShowDropdown,
}: FoodSearchProps) => {
    return (
        <div className="relative">
            <label className="text-xs text-sand uppercase tracking-widest font-semibold block mb-1.5">Food</label>

            {selectedFood ? (
                <div className="flex items-center gap-3 px-4 py-2.5 bg-subtle border border-lime/40 rounded-xl">
                    <span className="text-cream text-sm flex-1">{selectedFood.name}</span>
                    <button type="button" onClick={onClearFood} className="text-dim hover:text-sand text-xs">✕</button>
                </div>
            ) : (
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onFocus={() => results.length > 0 && setShowDropdown(true)}
                        placeholder="Search for a food..."
                        className="w-full bg-subtle border border-border rounded-xl px-4 py-2.5 text-cream text-sm placeholder:text-dim focus:outline-none focus:border-lime/50 transition-colors pr-8"
                        autoFocus
                    />
                    {isSearching && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-lime border-t-transparent rounded-full animate-spin" />
                    )}
                </div>
            )}

            {showDropdown && !selectedFood && (
                <div className="absolute z-10 mt-1 w-full bg-card border border-border rounded-xl shadow-xl overflow-hidden">
                    {results.length > 0 ? (
                        <>
                            {results.map(food => (
                                <button
                                    key={food.id}
                                    type="button"
                                    onClick={() => onSelectFood(food)}
                                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-subtle transition-colors text-left"
                                >
                                    <span className="text-cream text-sm">{food.name}</span>
                                    <span className="text-sand text-xs">{food.caloriesPer100g} kcal/100g</span>
                                </button>
                            ))}
                            <div className="border-t border-border">
                                <button type="button" onClick={onManualMode}
                                    className="w-full px-4 py-2.5 text-left text-sand text-xs hover:text-cream hover:bg-subtle transition-colors">
                                    + Enter manually instead
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="p-4 flex flex-col gap-2">
                            <p className="text-sand text-sm">No results for &ldquo;{searchTerm}&rdquo;</p>
                            <button type="button" onClick={onManualMode}
                                className="text-lime text-sm font-semibold text-left hover:text-lime-light transition-colors">
                                + Log manually
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FoodSearch;