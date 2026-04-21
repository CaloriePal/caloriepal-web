'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useShop } from './hooks';
import { ShopSkeleton, PurchaseConfirmModal } from './components';

const STREAK_FREEZE_COST = 400;

const ShopPage = () => {
    const { stats, loading, purchasing, handlePurchaseStreakFreeze } = useShop();
    const [showConfirm, setShowConfirm] = useState(false);
    if (loading) return <ShopSkeleton />;
    if (!stats) return null;

    const canAfford = stats.coins >= STREAK_FREEZE_COST;

    const handleConfirm = async () => {
        setShowConfirm(false);
        await handlePurchaseStreakFreeze();
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black tracking-widest uppercase font-heading text-white">
                        Adventurer&apos;s Market
                    </h1>
                    <p className="text-sand text-sm mt-1">Spend your hard-earned coins on power-ups</p>
                </div>
                <div className="flex items-center gap-2.5 bg-surface border border-border rounded-xl px-4 py-2.5 shrink-0">
                    <Icon icon="hugeicons:coins-02" className="text-lime w-5 h-5" />
                    <div className="text-right">
                        <p className="text-lime text-xl font-black leading-none">{stats.coins.toLocaleString()}</p>
                        <p className="text-sand text-[10px] uppercase tracking-widest font-semibold mt-0.5">Your Balance</p>
                    </div>
                </div>
            </div>

            <p className="text-xs font-black uppercase tracking-widest text-sand px-1">All Items</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4 hover:border-rose/40 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-rose/10 border border-rose/20 flex items-center justify-center">
                        <Icon icon="hugeicons:shield-01" className="w-6 h-6 text-rose" />
                    </div>

                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-rose mb-1">Rare</p>
                        <h2 className="text-white font-black font-heading text-lg leading-tight">Streak Freeze</h2>
                        <p className="text-sand text-sm mt-1 leading-snug">
                            Protect your streak for 1 day
                        </p>
                    </div>

                    <button
                        onClick={() => canAfford && !purchasing && setShowConfirm(true)}
                        disabled={!canAfford || purchasing}
                        className={`mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black transition-all ${canAfford && !purchasing
                            ? 'bg-lime text-black hover:bg-lime/90 active:scale-95'
                            : 'bg-surface border border-border text-muted cursor-not-allowed'
                            }`}
                    >
                        <Icon icon="hugeicons:coins-02" className="w-4 h-4" />
                        {`${STREAK_FREEZE_COST.toLocaleString()}`}
                    </button>
                </div>
            </div>

            {showConfirm && (
                <PurchaseConfirmModal
                    itemName="Streak Freeze"
                    cost={STREAK_FREEZE_COST}
                    currentCoins={stats.coins}
                    onConfirm={handleConfirm}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};

export default ShopPage;
