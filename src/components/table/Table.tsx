import React, {lazy, memo, Suspense} from 'react';
import TableRow from './tableRow/TableRow';
import {UserPreview} from '../../types/types';

const Pagination = lazy(() => import('./pagination/Pagination'));

import './styles.css';

interface TableProps {
    users: UserPreview[];
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    onPageChange: (page: number) => void;
    onPrefetch?: (page: number) => void;
}

const Table: React.FC<TableProps> = memo(({users, currentPage, totalPages, isLoading, onPageChange, onPrefetch}) => {
    return (
        <div className="table-container">
            {isLoading && <div className="table-loading-bar"/>}
            <table className="table">
                <thead className="table-header">
                <tr>
                    <th className="table-header-cell">Photo</th>
                    <th className="table-header-cell">Full Name</th>
                    <th className="table-header-cell">Email</th>
                    <th className="table-header-cell">Age</th>
                    <th className="table-header-cell">Phone</th>
                    <th className="table-header-cell">IP</th>
                    <th className="table-header-cell">Role</th>
                </tr>
                </thead>
                <tbody className={`table-body ${isLoading ? 'table-body--loading' : ''}`}>
                {users.map((user) => (
                    <TableRow key={user.id} user={user}/>
                ))}
                </tbody>
            </table>
            <Suspense fallback={"Counting pages..."}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    onPrefetch={onPrefetch}
                />
            </Suspense>
        </div>
    );
});

Table.displayName = 'Table';

export default Table;

