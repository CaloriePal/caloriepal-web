const QuestsSkeleton = () => (
    <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        <div className="bg-card border border-border rounded-2xl p-6 h-24" />
        <div className="flex gap-2">
            {[1, 2].map(i => <div key={i} className="h-9 w-24 bg-card border border-border rounded-full" />)}
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-surface rounded-xl" />)}
        </div>
    </div>
);

export default QuestsSkeleton;
