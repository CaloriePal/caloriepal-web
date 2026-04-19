'use client';

import { FoodItemDto, LogMealRequest } from "@models/nutrition";
import { useAddMealForm, useFoodSearch } from "./hooks";
import {
    CategorySelector,
    FoodSearch,
    ManualEntry,
    MacroPreview,
    ModalActions,
} from "./components";

interface Props {
    onClose: () => void;
    onAdd: (req: LogMealRequest) => Promise<void>;
}

const AddMealModal = ({ onClose, onAdd }: Props) => {
    const form = useAddMealForm(onAdd);
    const search = useFoodSearch(form.searchTerm, !form.isManual && !form.selectedFood);

    const handleSelectFood = (food: FoodItemDto) => {
        form.setSelectedFood(food);
        form.setSearchTerm(food.name);
        search.setShowDropdown(false);
    };

    const handleClearFood = () => {
        form.setSelectedFood(null);
        form.setQuantity('');
        form.setSearchTerm('');
    };

    const handleManualMode = () => {
        form.setIsManual(true);
        form.setSelectedFood(null);
        form.setSearchTerm('');
        search.setShowDropdown(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>

                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-heading font-bold text-cream text-lg">Add Meal</h3>
                    <button onClick={onClose} className="text-sand hover:text-cream transition-colors text-xl leading-none">✕</button>
                </div>

                <form onSubmit={form.handleSubmit} className="space-y-4">
                    <CategorySelector value={form.category} onChange={form.setCategory} />

                    {!form.isManual && (
                        <FoodSearch
                            searchTerm={form.searchTerm}
                            setSearchTerm={form.setSearchTerm}
                            selectedFood={form.selectedFood}
                            onSelectFood={handleSelectFood}
                            onClearFood={handleClearFood}
                            onManualMode={handleManualMode}
                            results={search.results}
                            isSearching={search.isSearching}
                            showDropdown={search.showDropdown}
                            setShowDropdown={search.setShowDropdown}
                        />
                    )}

                    {form.selectedFood && (
                        <div>
                            <label className="text-xs text-sand uppercase tracking-widest font-semibold block mb-1.5">
                                Quantity (grams)
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={form.quantity}
                                onChange={e => form.setQuantity(e.target.value)}
                                placeholder="e.g. 150"
                                className="w-full bg-subtle border border-border rounded-xl px-4 py-2.5 text-cream text-sm placeholder:text-dim focus:outline-none focus:border-lime/50 transition-colors"
                                autoFocus
                                required
                            />
                            {form.preview && <MacroPreview {...form.preview} />}
                        </div>
                    )}

                    {form.isManual && (
                        <ManualEntry
                            manualFields={form.manualFields}
                            setManualField={form.setManualField}
                            onBackToSearch={() => { form.setIsManual(false); form.resetManualFields(); }}
                        />
                    )}

                    <ModalActions onClose={onClose} canSubmit={form.canSubmit} submitting={form.submitting} />
                </form>
            </div>
        </div>
    );
};

export default AddMealModal;