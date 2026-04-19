'use client';

import { useEffect, useRef, useState } from "react";
import { FoodItemDto, LogMealRequest, MealCategory } from "@models/nutrition";
import { searchFoods } from "@utils/api";

interface Props {
    onClose: () => void;
    onAdd: (req: LogMealRequest) => Promise<void>;
}

const CATEGORIES: MealCategory[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const AddMealModal = ({ onClose, onAdd }: Props) => {
    const [category, setCategory]         = useState<MealCategory>('Breakfast');
    const [searchTerm, setSearchTerm]     = useState('');
    const [results, setResults]           = useState<FoodItemDto[]>([]);
    const [isSearching, setIsSearching]   = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedFood, setSelectedFood] = useState<FoodItemDto | null>(null);
    const [quantity, setQuantity]         = useState('');
    const [isManual, setIsManual]         = useState(false);
    const [manualName, setManualName]     = useState('');
    const [manualCal, setManualCal]       = useState('');
    const [manualPro, setManualPro]       = useState('');
    const [manualCarb, setManualCarb]     = useState('');
    const [manualFat, setManualFat]       = useState('');
    const [submitting, setSubmitting]     = useState(false);

    const searchRef = useRef<HTMLInputElement>(null);

    // Debounced search
    useEffect(() => {
        if (isManual || selectedFood) return;
        const term = searchTerm.trim();
        if (term.length < 2) { setResults([]); setShowDropdown(false); return; }

        const timer = setTimeout(async () => {
            setIsSearching(true);
            try {
                const data = await searchFoods(term);
                setResults(data);
                setShowDropdown(true);
            } catch {
                setResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, isManual, selectedFood]);

    const handleSelectFood = (food: FoodItemDto) => {
        setSelectedFood(food);
        setShowDropdown(false);
        setSearchTerm(food.name);
    };

    const handleClearFood = () => {
        setSelectedFood(null);
        setQuantity('');
        setSearchTerm('');
        setResults([]);
        setTimeout(() => searchRef.current?.focus(), 0);
    };

    const handleManualMode = () => {
        setIsManual(true);
        setManualName(searchTerm.trim());
        setShowDropdown(false);
        setSelectedFood(null);
        setSearchTerm('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (selectedFood) {
                await onAdd({ category, foodItemId: selectedFood.id, quantityGrams: Number(quantity) });
            } else {
                await onAdd({
                    category,
                    manualName: manualName.trim(),
                    manualCalories: Number(manualCal),
                    manualProtein:  Number(manualPro),
                    manualCarbs:    Number(manualCarb),
                    manualFat:      Number(manualFat),
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    // Computed macro preview when food + quantity are set
    const preview = selectedFood && Number(quantity) > 0 ? {
        calories: ((selectedFood.caloriesPer100g * Number(quantity)) / 100).toFixed(0),
        protein:  ((selectedFood.proteinPer100g  * Number(quantity)) / 100).toFixed(1),
        carbs:    ((selectedFood.carbsPer100g    * Number(quantity)) / 100).toFixed(1),
        fat:      ((selectedFood.fatPer100g      * Number(quantity)) / 100).toFixed(1),
    } : null;

    const canSubmit = !submitting && (
        selectedFood ? Number(quantity) > 0 :
        isManual     ? manualName.trim() && manualCal && manualPro && manualCarb && manualFat :
        false
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-heading font-bold text-cream text-lg">Add Meal</h3>
                    <button onClick={onClose} className="text-sand hover:text-cream transition-colors text-xl leading-none">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Category */}
                    <div>
                        <label className="text-xs text-sand uppercase tracking-widest font-semibold block mb-1.5">Category</label>
                        <div className="grid grid-cols-4 gap-2">
                            {CATEGORIES.map(cat => (
                                <button key={cat} type="button" onClick={() => setCategory(cat)}
                                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                                        category === cat
                                            ? 'bg-lime/10 border-lime/50 text-lime'
                                            : 'bg-subtle border-border text-sand hover:text-cream'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search / Food selection */}
                    {!isManual && (
                        <div className="relative">
                            <label className="text-xs text-sand uppercase tracking-widest font-semibold block mb-1.5">Food</label>

                            {selectedFood ? (
                                <div className="flex items-center gap-3 px-4 py-2.5 bg-subtle border border-lime/40 rounded-xl">
                                    <span className="text-cream text-sm flex-1">{selectedFood.name}</span>
                                    <button type="button" onClick={handleClearFood} className="text-dim hover:text-sand text-xs">✕</button>
                                </div>
                            ) : (
                                <div className="relative">
                                    <input
                                        ref={searchRef}
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

                            {/* Dropdown */}
                            {showDropdown && !selectedFood && (
                                <div className="absolute z-10 mt-1 w-full bg-card border border-border rounded-xl shadow-xl overflow-hidden">
                                    {results.length > 0 ? (
                                        <>
                                            {results.map(food => (
                                                <button
                                                    key={food.id}
                                                    type="button"
                                                    onClick={() => handleSelectFood(food)}
                                                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-subtle transition-colors text-left"
                                                >
                                                    <span className="text-cream text-sm">{food.name}</span>
                                                    <span className="text-sand text-xs">{food.caloriesPer100g} kcal/100g</span>
                                                </button>
                                            ))}
                                            <div className="border-t border-border">
                                                <button type="button" onClick={handleManualMode}
                                                    className="w-full px-4 py-2.5 text-left text-sand text-xs hover:text-cream hover:bg-subtle transition-colors">
                                                    + Enter manually instead
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="p-4 flex flex-col gap-2">
                                            <p className="text-sand text-sm">No results for &ldquo;{searchTerm}&rdquo;</p>
                                            <button type="button" onClick={handleManualMode}
                                                className="text-lime text-sm font-semibold text-left hover:text-lime-light transition-colors">
                                                + Log manually
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Quantity input (food selected) */}
                    {selectedFood && (
                        <div>
                            <label className="text-xs text-sand uppercase tracking-widest font-semibold block mb-1.5">
                                Quantity (grams)
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}
                                placeholder="e.g. 150"
                                className="w-full bg-subtle border border-border rounded-xl px-4 py-2.5 text-cream text-sm placeholder:text-dim focus:outline-none focus:border-lime/50 transition-colors"
                                autoFocus
                                required
                            />
                            {/* Macro preview */}
                            {preview && (
                                <div className="mt-2 grid grid-cols-4 gap-2 text-center">
                                    <div className="bg-subtle rounded-lg py-2">
                                        <div className="text-lime font-bold text-sm">{preview.calories}</div>
                                        <div className="text-dim text-[10px] uppercase tracking-wide">kcal</div>
                                    </div>
                                    <div className="bg-subtle rounded-lg py-2">
                                        <div className="text-sky font-bold text-sm">{preview.protein}g</div>
                                        <div className="text-dim text-[10px] uppercase tracking-wide">protein</div>
                                    </div>
                                    <div className="bg-subtle rounded-lg py-2">
                                        <div className="text-gold font-bold text-sm">{preview.carbs}g</div>
                                        <div className="text-dim text-[10px] uppercase tracking-wide">carbs</div>
                                    </div>
                                    <div className="bg-subtle rounded-lg py-2">
                                        <div className="text-rose font-bold text-sm">{preview.fat}g</div>
                                        <div className="text-dim text-[10px] uppercase tracking-wide">fat</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Manual entry fields */}
                    {isManual && (
                        <>
                            <div className="flex items-center justify-between">
                                <label className="text-xs text-sand uppercase tracking-widest font-semibold">Manual Entry</label>
                                <button type="button" onClick={() => { setIsManual(false); setManualName(''); }}
                                    className="text-xs text-dim hover:text-sand transition-colors">
                                    ← Back to search
                                </button>
                            </div>
                            <input
                                type="text"
                                value={manualName}
                                onChange={e => setManualName(e.target.value)}
                                placeholder="Meal name"
                                className="w-full bg-subtle border border-border rounded-xl px-4 py-2.5 text-cream text-sm placeholder:text-dim focus:outline-none focus:border-lime/50 transition-colors"
                                required
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <MacroInput label="Calories" unit="kcal" value={manualCal}  onChange={setManualCal}  accent="text-lime" />
                                <MacroInput label="Protein"  unit="g"    value={manualPro}  onChange={setManualPro}  accent="text-sky"  />
                                <MacroInput label="Carbs"    unit="g"    value={manualCarb} onChange={setManualCarb} accent="text-gold" />
                                <MacroInput label="Fat"      unit="g"    value={manualFat}  onChange={setManualFat}  accent="text-rose" />
                            </div>
                        </>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                        <button type="button" onClick={onClose}
                            className="flex-1 py-2.5 rounded-xl border border-border text-sand text-sm font-semibold hover:text-cream transition-all">
                            Cancel
                        </button>
                        <button type="submit" disabled={!canSubmit}
                            className="flex-1 py-2.5 rounded-xl bg-lime text-black text-sm font-bold hover:bg-lime-light transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                            {submitting ? 'Logging…' : 'Add Meal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

interface MacroInputProps {
    label: string;
    unit: string;
    value: string;
    onChange: (v: string) => void;
    accent: string;
}

const MacroInput = ({ label, unit, value, onChange, accent }: MacroInputProps) => (
    <div>
        <label className={`text-xs uppercase tracking-widest font-semibold block mb-1.5 ${accent}`}>
            {label} <span className="text-dim normal-case">({unit})</span>
        </label>
        <input
            type="number"
            min="0"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="0"
            className="w-full bg-subtle border border-border rounded-xl px-4 py-2.5 text-cream text-sm placeholder:text-dim focus:outline-none focus:border-lime/50 transition-colors"
            required
        />
    </div>
);

export default AddMealModal;
