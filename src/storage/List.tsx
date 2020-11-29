import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Row from './Item';
import { Item } from '../api/storage';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 650,
    },
}));

interface ListProps {
    items: Array<Item>;
    deleteItem: (id: string) => void;
}

export default function List({ items, deleteItem }: ListProps) {
    const classes = useStyles();

    return (
        <TableContainer className={classes.root} component={Paper}>
            <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell padding="checkbox"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <Row item={item} deleteItem={deleteItem} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
