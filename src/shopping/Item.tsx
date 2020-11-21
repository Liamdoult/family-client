import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export interface ItemProp {
    _id: string,
    name: string,
    description: string,
    quantity: number,
    measure: string,
}

interface ItemProps {
    item: ItemProp,
}

export default function Item({ item }: ItemProps ) {
    return (
        <TableRow key={item._id}>
            <TableCell component="th" scope="row">{item.name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{`${item.quantity} ${item.measure}`}</TableCell>
        </TableRow>
     );
}
