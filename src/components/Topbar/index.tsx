"use client";

import { usePathname } from "next/navigation";
import { Gamepad2 } from 'lucide-react';

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
        <header className="h-14 flex-shrink-0 bg-background border-b border-border flex items-center px-6 gap-4">
            {/* Page icon + title */}
            <div className="flex items-center gap-3">
                <Gamepad2 className="w-5 h-5" />
                <span className="text-muted text-sm font-mono tracking-widest uppercase">
                    {title}
                </span>
            </div>
        </header>
    );
}

export default Topbar;