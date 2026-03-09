import React, { memo } from 'react';

import './styles.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onPrefetch?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = memo(({
                                                       currentPage,
                                                       totalPages,
                                                       onPageChange,
                                                       onPrefetch
                                                   }) => {
    const goToPage = (page: number) => {
        onPageChange(Math.max(1, Math.min(page, totalPages)));
    };

    const getPageNumbers = (): (number | string)[] => {
        const delta = 2;
        const pages: (number | string)[] = [];
        let prevPage = 0;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                if (prevPage && i - prevPage > 1) {
                    pages.push(i - prevPage === 2 ? prevPage + 1 : '...');
                }
                pages.push(i);
                prevPage = i;
            }
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <div className="pagination-pages">
                {getPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' ? goToPage(page) : undefined}
                        onMouseEnter={() => typeof page === 'number' && onPrefetch?.(page)}
                        disabled={page === '...'}
                        className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
});

Pagination.displayName = 'Pagination';

export default Pagination;
