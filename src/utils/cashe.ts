import { ApiResponse } from '../api';

const CACHE_TTL_MS = 60_000; // 60 секунд

interface CacheEntry {
    data: ApiResponse;
    timestamp: number;
}

const cache = new Map<string, CacheEntry>();


export const buildCacheKey = (query: string, page: number): string =>
    `${query}:${page}`;

export const getCache = (key: string): ApiResponse | null => {
    console.log(cache)
    const entry = cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > CACHE_TTL_MS;
    if (isExpired) {
        cache.delete(key);
        return null;
    }

    return entry.data;
};

export const setCache = (key: string, data: ApiResponse): void => {
    cache.set(key, { data, timestamp: Date.now() });
};

export const clearCache = (): void => {
    cache.clear();
};
