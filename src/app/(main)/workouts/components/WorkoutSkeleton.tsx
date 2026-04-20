const Shimmer = ({ className }: { className: string }) => (
    <div className={`animate-pulse bg-subtle rounded-xl ${className}`} />
);

const WorkoutSkeleton = () => (
    <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-5 space-y-3">
                    <Shimmer className="w-6 h-6" />
                    <Shimmer className="w-20 h-8" />
                    <Shimmer className="w-24 h-3" />
                </div>
            ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-5">
                <Shimmer className="w-36 h-5" />
                <Shimmer className="w-32 h-9" />
            </div>
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-subtle border border-border rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                        <Shimmer className="w-10 h-10" />
                        <div className="space-y-2 flex-1">
                            <Shimmer className="w-32 h-4" />
                            <Shimmer className="w-48 h-3" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Shimmer className="w-32 h-6" />
                        <Shimmer className="w-28 h-6" />
                        <Shimmer className="w-24 h-6" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default WorkoutSkeleton;
