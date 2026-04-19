const DashboardSkeleton = () => (
    <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-lime border-t-transparent rounded-full animate-spin" />
            <p className="text-sand text-sm">Loading your stats...</p>
        </div>
    </div>
);

export default DashboardSkeleton;