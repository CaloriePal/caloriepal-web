import MacroInput from "./MacroInput";

interface ManualEntryProps {
    manualFields: { name: string; cal: string; pro: string; carb: string; fat: string; };
    setManualField: (field: string, value: string) => void;
    onBackToSearch: () => void;
}

const ManualEntry = ({ manualFields, setManualField, onBackToSearch }: ManualEntryProps) => (
    <>
        <div className="flex items-center justify-between">
            <label className="text-xs text-sand uppercase tracking-widest font-semibold">Manual Entry</label>
            <button type="button" onClick={onBackToSearch}
                className="text-xs text-dim hover:text-sand transition-colors">
                ← Back to search
            </button>
        </div>
        <input
            type="text"
            value={manualFields.name}
            onChange={e => setManualField('name', e.target.value)}
            placeholder="Meal name"
            className="w-full bg-subtle border border-border rounded-xl px-4 py-2.5 text-cream text-sm placeholder:text-dim focus:outline-none focus:border-lime/50 transition-colors"
            required
        />
        <div className="grid grid-cols-2 gap-3">
            <MacroInput label="Calories" unit="kcal" value={manualFields.cal} onChange={v => setManualField('cal', v)} accent="text-lime" />
            <MacroInput label="Protein" unit="g" value={manualFields.pro} onChange={v => setManualField('pro', v)} accent="text-sky" />
            <MacroInput label="Carbs" unit="g" value={manualFields.carb} onChange={v => setManualField('carb', v)} accent="text-gold" />
            <MacroInput label="Fat" unit="g" value={manualFields.fat} onChange={v => setManualField('fat', v)} accent="text-rose" />
        </div>
    </>
);

export default ManualEntry;