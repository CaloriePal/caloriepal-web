interface MacroPreviewProps {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
}

const MacroPreview = ({ calories, protein, carbs, fat }: MacroPreviewProps) => (
    <div className="mt-2 grid grid-cols-4 gap-2 text-center">
        <div className="bg-subtle rounded-lg py-2">
            <div className="text-lime font-bold text-sm">{calories}</div>
            <div className="text-dim text-[10px] uppercase tracking-wide">kcal</div>
        </div>
        <div className="bg-subtle rounded-lg py-2">
            <div className="text-sky font-bold text-sm">{protein}g</div>
            <div className="text-dim text-[10px] uppercase tracking-wide">protein</div>
        </div>
        <div className="bg-subtle rounded-lg py-2">
            <div className="text-gold font-bold text-sm">{carbs}g</div>
            <div className="text-dim text-[10px] uppercase tracking-wide">carbs</div>
        </div>
        <div className="bg-subtle rounded-lg py-2">
            <div className="text-rose font-bold text-sm">{fat}g</div>
            <div className="text-dim text-[10px] uppercase tracking-wide">fat</div>
        </div>
    </div>
);

export default MacroPreview;