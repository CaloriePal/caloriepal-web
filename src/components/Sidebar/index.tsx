"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { Swords } from "lucide-react";
import { useState } from "react";
import { navItems, NavLink } from "./data";

const Sidebar = () => {
    const pathname = usePathname();
    const [comingSoonLabel, setComingSoonLabel] = useState<string | null>(null);

    const handleNavClick = (e: React.MouseEvent, link: NavLink) => {
        if (link.status === 'disabled' || link.status === 'coming-soon') {
            e.preventDefault();
        }
        if (link.status === 'coming-soon') {
            setComingSoonLabel(link.label);
        }
    };

    return (
        <>
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
                                {section.links.map((link) => {
                                    const { href, label, icon, status } = link;
                                    const active = pathname === href;
                                    const isDisabled = status === 'disabled';
                                    const isComingSoon = status === 'coming-soon';
                                    const isDimmed = isDisabled || isComingSoon;

                                    return (
                                        <Link
                                            key={href}
                                            href={href}
                                            prefetch={isDimmed ? false : undefined}
                                            onClick={(e) => handleNavClick(e, link)}
                                            className={`
                                                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                                                ${active
                                                    ? "bg-lime/10 text-lime"
                                                    : isDimmed
                                                        ? "text-dim opacity-50 cursor-not-allowed"
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
                                            <div className="ml-auto flex items-center">
                                                {active && !isDimmed && (
                                                    <div className="w-1 h-1 rounded-full bg-lime" />
                                                )}
                                                {isComingSoon && (
                                                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gold/10 text-gold border border-gold/20">
                                                        Soon
                                                    </span>
                                                )}
                                                {isDisabled && (
                                                    <Icon icon="hugeicons:lock-01" width={13} height={13} className="text-dim" />
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="px-3 py-4 border-t border-border space-y-0.5">
                    <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-white hover:bg-subtle/60 transition-all">
                        <Icon icon="hugeicons:settings-01" width={18} height={18} className="text-sand" />
                        <span>Settings</span>
                    </Link>
                    <button
                        onClick={() => window.location.href = '/auth/logout'}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-red-400 hover:bg-red-500/5 transition-all"
                    >
                        <Icon icon="hugeicons:logout-01" width={18} height={18} className="text-sand" />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {comingSoonLabel && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setComingSoonLabel(null)}
                >
                    <div
                        className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full mx-4 text-center space-y-3"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="text-4xl">⚔️</div>
                        <h3 className="text-white font-black text-lg uppercase tracking-widest">Coming Soon</h3>
                        <p className="text-sand text-sm">
                            <span className="text-lime font-semibold">{comingSoonLabel}</span> is currently under construction. Check back soon!
                        </p>
                        <button
                            onClick={() => setComingSoonLabel(null)}
                            className="mt-2 px-6 py-2.5 rounded-xl bg-lime text-black text-sm font-bold hover:bg-lime-light transition-all"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;