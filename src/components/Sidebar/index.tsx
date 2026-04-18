"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

const navItems = [
    {
        label: "Main",
        links: [
            { href: "/dashboard", label: "Dashboard", icon: "hugeicons:dashboard-square-02" },
            { href: "/quests", label: "Quests", icon: "hugeicons:task-01" },
            { href: "/achievements", label: "Achievements", icon: "hugeicons:champion" },
            { href: "/workouts", label: "Workouts", icon: "hugeicons:dumbbell-01" },
            { href: "/nutrition", label: "Nutrition", icon: "hugeicons:apple" },
            { href: "/progress", label: "Progress", icon: "hugeicons:chart-increase" },
            { href: "/shop", label: "Shop", icon: "hugeicons:shopping-bag-01" },
            { href: "/leaderboard", label: "Leaderboard", icon: "hugeicons:ranking" },
        ],
    },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-56 flex-shrink-0 bg-background border-r border-zinc-800/60 flex flex-col">
            {/* Logo */}
            <div className="h-14 flex items-center px-5 border-b border-zinc-800/60">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-lime rounded-md flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" fill="#0a0a0a" />
                        </svg>
                    </div>
                    <span className="text-white font-black text-sm tracking-widest uppercase">
                        CaloriePal
                    </span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
                {navItems.map((section) => (
                    <div key={section.label}>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 px-2 mb-2">
                            {section.label}
                        </p>
                        <div className="space-y-0.5">
                            {section.links.map(({ href, label, icon }) => {
                                const active = pathname === href;
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`
                                            flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                                            ${active
                                                ? "bg-lime/10 text-lime"
                                                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                                            }
                                        `}
                                    >
                                        <Icon
                                            icon={icon}
                                            width={18}
                                            height={18}
                                            className={active ? "text-lime" : "text-zinc-500"}
                                        />
                                        <span>{label}</span>
                                        {active && (
                                            <div className="ml-auto w-1 h-1 rounded-full bg-lime" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Bottom */}
            <div className="px-3 py-4 border-t border-zinc-800/60 space-y-0.5">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all"
                >
                    <Icon icon="hugeicons:settings-01" width={18} height={18} className="text-zinc-500" />
                    <span>Settings</span>
                </Link>
                <Link
                    href="/auth/logout"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
                >
                    <Icon icon="hugeicons:logout-01" width={18} height={18} className="text-zinc-500" />
                    <span>Log Out</span>
                </Link>
            </div>
        </aside>
    );
}

export default Sidebar;