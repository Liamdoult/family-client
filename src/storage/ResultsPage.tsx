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

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    table: {
        minWidth: 650,
    },
}));

interface ResultsPageProps {
    result: StorageAPI.Box | StorageAPI.Item;
}

function ItemResult({ item }: { item: StorageAPI.Item }) {
    return <>{item ? <div>{item._id}</div> : <></>}</>;
}

function BoxResult({ box }: { box: StorageAPI.Box }) {
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
    if (result.type === StorageAPI.BaseObjectType.BOX)
        return <BoxResult box={result as StorageAPI.Box} />;
    if (result.type === StorageAPI.BaseObjectType.ITEM)
        return <ItemResult item={result as StorageAPI.Item} />;
    return <div>ERROR: ITEM TYPE NOT FOUND</div>;
}
