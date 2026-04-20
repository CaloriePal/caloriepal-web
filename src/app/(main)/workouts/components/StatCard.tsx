import { Icon } from '@iconify/react';

type Color = 'lime' | 'sky' | 'gold' | 'rose';

const COLOR_MAP: Record<Color, string> = {
    lime: 'text-lime',
    sky: 'text-sky',
    gold: 'text-gold',
    rose: 'text-rose',
};

interface StatCardProps {
    label: string;
    value: string;
    icon: string;
    color: Color;
}

const StatCard = ({ label, value, icon, color }: StatCardProps) => (
    <div className="bg-card border border-border rounded-2xl p-5">
        <Icon icon={icon} className={`text-xl mb-3 ${COLOR_MAP[color]}`} />
        <div className="font-heading font-bold text-cream text-3xl mb-1">{value}</div>
        <div className="text-sand text-xs uppercase tracking-widest font-semibold">{label}</div>
    </div>
);

export default StatCard;
