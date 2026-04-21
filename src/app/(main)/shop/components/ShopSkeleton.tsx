const ShopSkeleton = () => (
    <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        <div className="bg-card border border-border rounded-2xl p-6 h-24" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-2xl p-5 h-56" />
        </div>
    </div>
);

export default ShopSkeleton;
