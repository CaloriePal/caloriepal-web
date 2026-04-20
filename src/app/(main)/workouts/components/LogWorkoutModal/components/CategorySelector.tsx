import type { WorkoutCategory } from '@models/workout';

const CATEGORIES: WorkoutCategory[] = ['Strength', 'Cardio'];

interface Props {
    value: WorkoutCategory;
    onChange: (cat: WorkoutCategory) => void;
}

const CategorySelector = ({ value, onChange }: Props) => (
    <div>
        <label className="text-xs text-sand uppercase tracking-widest font-semibold block mb-1.5">Category</label>
        <div className="grid grid-cols-5 gap-2">
            {CATEGORIES.map(cat => (
                <button key={cat} type="button" onClick={() => onChange(cat)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${value === cat
                        ? 'bg-lime/10 border-lime/50 text-lime'
                        : 'bg-subtle border-border text-sand hover:text-cream'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    </div>
);

export default CategorySelector;
