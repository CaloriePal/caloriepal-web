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

export default MacroInput;