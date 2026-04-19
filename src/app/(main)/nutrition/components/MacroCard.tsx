type MacroColor = 'lime' | 'sky' | 'gold' | 'rose';

interface MacroCardProps {
    label: string;
    icon: string;
    consumed: number;
    goal: number;
    unit: string;
    color: MacroColor;
}

const colorMap: Record<MacroColor, { text: string; bar: string }> = {
    lime: { text: 'text-lime', bar: 'bg-lime' },
    sky:  { text: 'text-sky',  bar: 'bg-sky'  },
    gold: { text: 'text-gold', bar: 'bg-gold' },
    rose: { text: 'text-rose', bar: 'bg-rose' },
};

const MacroCard = ({ label, icon, consumed, goal, unit, color }: MacroCardProps) => {
    const pct = Math.min(100, Math.round((consumed / goal) * 100));
    const { text, bar } = colorMap[color];

    return (
        <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{icon}</span>
                <span className="text-xs text-sand uppercase tracking-widest font-semibold">{label}</span>
            </div>
            <div className="flex items-baseline gap-1.5">
                <span className={`text-4xl font-bold font-heading ${text}`}>{consumed}</span>
                <span className="text-sand text-sm">/ {goal} {unit}</span>
            </div>
            <div className="h-1.5 bg-subtle rounded-full mt-4">
                <div
                    className={`h-1.5 ${bar} rounded-full transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
};

export default MacroCard;
