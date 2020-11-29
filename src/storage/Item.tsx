import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { Item } from '../api/storage';

interface ItemProps {
    item: Item;
    deleteItem: (id: string) => void;
}

export default function Row({ item, deleteItem }: ItemProps) {
    return (
        <TableRow key={item._id}>
            <TableCell style={{ width: '100' }} component="th" scope="row">
                {item.name}
            </TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.created}</TableCell>
            <TableCell>{item.owner}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell
                padding="checkbox"
                align="right"
                onClick={() => deleteItem(item._id)}
            >
                <DeleteForeverIcon />
            </TableCell>
        </TableRow>
    );
}
