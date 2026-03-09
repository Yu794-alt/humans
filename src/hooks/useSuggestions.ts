import { useState, useEffect } from 'react';
import { searchUser } from '../api';
import { UserSuggestion } from '../types/types';
import { useDebounce } from './useDebounce';

export const useSuggestions = (query: string): UserSuggestion[] => {
    const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        if (!debouncedQuery) {
            setSuggestions([]);
            return;
        }

        const controller = new AbortController();

        searchUser(debouncedQuery)
            .then(result => {
                if (!controller.signal.aborted && result) {
                    setSuggestions(result.users as UserSuggestion[]);
                }
            })
            .catch(() => {});

        return () => controller.abort();
    }, [debouncedQuery]);

    return suggestions;
};

