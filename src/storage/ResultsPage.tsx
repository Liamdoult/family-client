import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import { Storage as StorageAPI } from '../api';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    table: {
        minWidth: 650,
    },
}));

enum Type {
    Box,
    Item,
}

export interface Box {
    _id: string;
    label: string;
    items: Item[];
    location: string;
    created: string;
    updated: string[];
    type: Type;
}

export interface Item {
    _id: string;
    name: string;
    description: string;
    owner: string | undefined;
    quantity: Number | undefined;
    created: string;
    type: Type;
}

interface ResultsPageProps {
    result: Box | Item;
}

function ItemResult({ item }: { item: Item }) {
    return <>{item ? <div>{item._id}</div> : <></>}</>;
}

function BoxResult({ box }: { box: Box }) {
    const classes = useStyles();

    return (
        <>
            {box._id}
            <br />
            {box.label}
            <br />
            {box.location}
            <br />
            {box.created}
            <br />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow key="heading">
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Created</TableCell>
                            <TableCell align="right">Owner</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {box.items.map((containedItem: StorageAPI.Item) => (
                            <TableRow key={containedItem._id}>
                                <TableCell component="th" scope="row">
                                    {containedItem.name}
                                </TableCell>
                                <TableCell align="right">
                                    {containedItem.description}
                                </TableCell>
                                <TableCell align="right">
                                    {containedItem.created}
                                </TableCell>
                                <TableCell align="right">
                                    {containedItem.owner || ''}
                                </TableCell>
                                <TableCell align="right">
                                    {containedItem.quantity || 1}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default function ResultsPage({ result }: ResultsPageProps) {
    if (result.type === Type.Box) return <BoxResult box={result as Box} />;
    if (result.type === Type.Item) return <ItemResult item={result as Item} />;
    return <div>ERROR: ITEM TYPE NOT FOUND</div>;
}
