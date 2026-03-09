import React, {memo} from 'react';
import {UserPreview} from '../../../types/types';

import './styles.css';

interface TableRowProps {
    user: UserPreview;
}

const TableRow: React.FC<TableRowProps> = memo(({user}) => {
    return (
        <tr className="table-row" role="row">
            <td className="table-cell">
                <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={64}
                    height={64}
                />
            </td>
            <td className="table-cell">{`${user.firstName} ${user.lastName}`}</td>
            <td className="table-cell">{user.email}</td>
            <td className="table-cell">{user.age}</td>
            <td className="table-cell">{user.phone}</td>
            <td className="table-cell">{user.ip}</td>
            <td className="table-cell">{user.role}</td>
        </tr>
    );
});

TableRow.displayName = 'TableRow';

export default TableRow;
