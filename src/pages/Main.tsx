import React, {useState, useEffect, useCallback} from 'react';
import SearchInput from '../components/searchInput/SearchInput';
import Table from '../components/table/Table';
import {usePagination} from '../hooks/usePagination';
import {useSuggestions} from '../hooks/useSuggestions';
import {getAllUsers, searchUser} from '../api';
import {UserPreview} from '../types/types';
import {buildCacheKey, clearCache, getCache, setCache} from "../utils/cashe";

const ITEMS_PER_PAGE = 10;

const Main = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [committedQuery, setCommittedQuery] = useState('');
    const [isSearchMode, setIsSearchMode] = useState(false);

    const [users, setUsers] = useState<UserPreview[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const suggestions = useSuggestions(searchQuery);

    const {currentPage, totalPages, skip, goToPage, reset} = usePagination(totalCount, ITEMS_PER_PAGE);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            const cacheKey = buildCacheKey(isSearchMode ? committedQuery : '', currentPage);
            const cached = getCache(cacheKey);

            if (cached) {
                setUsers(cached.users as UserPreview[]);
                setTotalCount(cached.total);
                return;
            }

            setIsLoading(true);
            try {
                const result = isSearchMode
                    ? await searchUser(committedQuery, ITEMS_PER_PAGE, skip)
                    : await getAllUsers(ITEMS_PER_PAGE, skip);

                if (!controller.signal.aborted && result !== null) {
                    setUsers(result.users as UserPreview[]);
                    setTotalCount(result.total);
                    setCache(cacheKey, result);

                    // Автоматический prefetch следующей страницы в фоне
                    const nextPage = currentPage + 1;
                    const nextSkip = skip + ITEMS_PER_PAGE;
                    const nextKey = buildCacheKey(isSearchMode ? committedQuery : '', nextPage);

                    if (!getCache(nextKey) && nextSkip < result.total) {
                        prefetchCashData(nextKey, nextSkip);
                    }
                }
            } catch {
                console.error('Failed to fetch data');
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        };

        fetchData();
        return () => controller.abort();
    }, [currentPage, skip, isSearchMode, committedQuery]);

    const handlePrefetch = useCallback((page: number) => {
        const key = buildCacheKey(isSearchMode ? committedQuery : '', page);
        if (getCache(key)) {
            return;
        }
        const prefetchSkip = (page - 1) * ITEMS_PER_PAGE;

        prefetchCashData(key, prefetchSkip);
    }, [isSearchMode, committedQuery]);

    const prefetchCashData = async (key: string, skip: number) => {
        const prefetchFn = isSearchMode
            ? searchUser(committedQuery, ITEMS_PER_PAGE, skip)
            : getAllUsers(ITEMS_PER_PAGE, skip);
        prefetchFn.then(nestResualt => {
            if (nestResualt)
                setCache(key, nestResualt);
        }).catch(() => {
            console.error('Failed to pre fetch data');
        });
    }

    const handleSearchChange = useCallback((value: string) => {
        setSearchQuery(value);
        if (!value) {
            clearCache();
            setIsSearchMode(false);
            reset();
        }
    }, [reset]);

    const handleSearchClick = useCallback(() => {
        if (!searchQuery.trim()) return;
        clearCache();
        setCommittedQuery(searchQuery.trim());
        setIsSearchMode(true);
        reset();
    }, [searchQuery, reset]);

    const handleItemClick = useCallback((str: string) => {
        clearCache();
        setSearchQuery(str);
        setCommittedQuery(str);
        setIsSearchMode(true);
        reset();
    }, [reset]);

    const handlePageChange = useCallback((page: number) => {
        goToPage(page);
    }, [goToPage]);

    return (
        <>
            <header className="App-header">
                <SearchInput
                    value={searchQuery}
                    onClick={handleSearchClick}
                    onChange={handleSearchChange}
                    onItemClick={handleItemClick}
                    suggestions={suggestions}
                />
            </header>
            <main>
                <Table
                    users={users}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    isLoading={isLoading}
                    onPageChange={handlePageChange}
                    onPrefetch={handlePrefetch}
                />
            </main>
        </>
    );
};

export default Main;
