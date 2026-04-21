'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchPlayerStats, purchaseStreakFreeze } from '@utils/api';
import type { PlayerStatsDto } from '@models/dashboard';

export const useShop = () => {
    const [stats, setStats] = useState<PlayerStatsDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        fetchPlayerStats()
            .then(setStats)
            .finally(() => setLoading(false));
    }, []);

    const handlePurchaseStreakFreeze = useCallback(async (): Promise<boolean> => {
        if (!stats) return false;
        setPurchasing(true);
        try {
            const result = await purchaseStreakFreeze();
            setStats(prev => prev
                ? { ...prev, coins: result.newCoinBalance, streakFreezes: result.newStreakFreezeCount }
                : prev
            );
            return true;
        } catch {
            return false;
        } finally {
            setPurchasing(false);
        }
    }, [stats]);

    return { stats, loading, purchasing, handlePurchaseStreakFreeze };
};
