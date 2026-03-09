import { useState, useCallback } from 'react';

interface PaginationResult {
    currentPage: number;
    totalPages: number;
    skip: number;
    goToPage: (page: number) => void;
    reset: () => void;
}

export function usePagination(totalCount: number, itemsPerPage: number): PaginationResult {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const skip = (currentPage - 1) * itemsPerPage;

    const goToPage = useCallback((page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    }, [totalPages]);

    const reset = useCallback(() => {
        setCurrentPage(1);
    }, []);

    return { currentPage, totalPages, skip, goToPage, reset };
}