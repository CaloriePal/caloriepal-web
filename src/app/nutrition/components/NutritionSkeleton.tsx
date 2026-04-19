const NutritionSkeleton = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse">
                        <div className="h-3 w-20 bg-subtle rounded mb-4" />
                        <div className="h-8 w-24 bg-subtle rounded mb-4" />
                        <div className="h-1.5 bg-subtle rounded-full" />
                    </div>
                ))}
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 animate-pulse">
                <div className="h-5 w-40 bg-subtle rounded mb-6" />
                <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-16 bg-subtle rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NutritionSkeleton;