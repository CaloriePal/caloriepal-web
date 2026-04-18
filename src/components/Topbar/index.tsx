"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/quests": "Quests",
    "/achievements": "Achievements",
    "/workouts": "Workouts",
    "/nutrition": "Nutrition",
    "/progress": "Progress",
    "/shop": "Shop",
    "/leaderboard": "Leaderboard",
    "/settings": "Settings",
};

const Topbar = () => {
    const pathname = usePathname();
    const title = pageTitles[pathname] ?? "CaloriePal";

    return (
        <header className="h-14 flex-shrink-0 bg-background border-b border-zinc-800/60 flex items-center px-6 gap-4">
            {/* Page icon + title */}
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 border border-zinc-700 rounded flex items-center justify-center">
                    <div className="w-2.5 h-2.5 border border-zinc-500 rounded-sm" />
                </div>
                <span className="text-zinc-400 text-sm font-mono tracking-widest uppercase">
                    {title}
                </span>
            </div>
        </header>
    );
}

export default Topbar;