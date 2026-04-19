import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";

const FeatureCard = ({
    icon: Icon,
    title,
    description,
    iconClass,
    delay,
}: {
    icon: typeof Dumbbell;
    title: string;
    description: string;
    iconClass: string;
    delay: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="rounded-2xl border border-border bg-card p-5"
    >
        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${iconClass}`}>
            <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-heading font-semibold text-cream mb-1">{title}</h3>
        <p className="text-sm text-sand leading-relaxed">{description}</p>
    </motion.div>
);

export default FeatureCard;