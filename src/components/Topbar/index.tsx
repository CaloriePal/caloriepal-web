"use client";

import { usePathname } from "next/navigation";
import { Gamepad2 } from 'lucide-react';
import { pageTitles } from "./data";

const Topbar = () => {
    const pathname = usePathname();
    const title = pageTitles[pathname] ?? "CaloriePal";

    return (
        <header className="h-14 flex-shrink-0 bg-background border-b border-border flex items-center px-6 gap-4">
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