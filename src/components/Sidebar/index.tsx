"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { Swords } from "lucide-react";
import { navItems } from "./data";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-56 flex-shrink-0 bg-background border-r border-border flex flex-col">
            <div className="h-14 flex items-center px-5 border-b border-border">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center">
                        <Swords className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-white font-black text-sm tracking-widest uppercase">
                        CaloriePal
                    </span>
                </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
                {navItems.map((section) => (
                    <div key={section.label}>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-dim px-2 mb-2">
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
                                                : "text-muted hover:text-white hover:bg-subtle/60"
                                            }
                                        `}
                                    >
                                        <Icon
                                            icon={icon}
                                            width={18}
                                            height={18}
                                            className={active ? "text-lime" : "text-sand"}
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

            <div className="px-3 py-4 border-t border-border space-y-0.5">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-white hover:bg-subtle/60 transition-all"
                >
                    <Icon icon="hugeicons:settings-01" width={18} height={18} className="text-sand" />
                    <span>Settings</span>
                </Link>
                <Link
                    href="/auth/logout"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-red-400 hover:bg-red-500/5 transition-all"
                >
                    <Icon icon="hugeicons:logout-01" width={18} height={18} className="text-sand" />
                    <span>Log Out</span>
                </Link>
            </div>
        </aside>
    );
}

export default Sidebar;