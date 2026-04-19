import { FoodItemDto } from '@models/nutrition';
import { searchFoods } from '@utils/api';
import { useEffect, useState } from 'react';

export const useFoodSearch = (searchTerm: string, enabled: boolean) => {
  const [results, setResults] = useState<FoodItemDto[]>([]);
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
        const data = await searchFoods(term);
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
