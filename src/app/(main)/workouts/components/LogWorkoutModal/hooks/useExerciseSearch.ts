import { useEffect, useState } from 'react';
import { searchExercises } from '@utils/api';
import type { ExerciseDto } from '@models/workout';

export const useExerciseSearch = (searchTerm: string, enabled: boolean) => {
    const [results, setResults] = useState<ExerciseDto[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (!enabled) return;
        const term = searchTerm.trim();
        if (term.length < 2) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        const timer = setTimeout(async () => {
            setIsSearching(true);
            try {
                const data = await searchExercises(term);
                setResults(data);
                setShowDropdown(true);
            } catch {
                setResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, enabled]);

    return { results, isSearching, showDropdown, setShowDropdown };
};
