import React from 'react';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import { Storage as StorageAPI } from '../api';
import Search from '../Search';
import CreateBox from './CreateBox';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        hight: '100vh',
    },
    table: {
        minWidth: 650,
    },
}));

export default function Storage() {
    const classes = useStyles();

    const [loading, setLoading] = useState<boolean>(false);
    const [box, setBox] = useState<StorageAPI.Box | undefined>(undefined);
    const [item, setItem] = useState<StorageAPI.Item | undefined>(undefined);

    function handleSubmit(
        option: StorageAPI.PartialBox | StorageAPI.Item | null
    ) {
        setLoading(true);
        if ((option as StorageAPI.Item).name) {
            setBox(undefined);
            setItem(option as StorageAPI.Item);
            setLoading(false);
        }
        if ((option as StorageAPI.PartialBox).label) {
            setItem(undefined);
            StorageAPI.getBox((option as StorageAPI.PartialBox)._id).then(
                (box) => {
                    setBox(box);
                    setLoading(false);
                }
            );
        }
    }

    return (
        <div className={classes.root}>
            <br />
            <Grid container spacing={3} justify="center" alignItems="center">
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Search hook={handleSubmit} disabled={loading}></Search>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper>
                        {item ? <div>{item._id}</div> : <></>}
                        {box ? (
                            <div>
                                {box._id}
                                <br />
                                {box.label}
                                <br />
                                {box.location}
                                <br />
                                {box.created}
                                <br />
                                <TableContainer component={Paper}>
                                    <Table
                                        className={classes.table}
                                        aria-label="simple table"
                                    >
                                        <TableHead>
                                            <TableRow key="heading">
                                                <TableCell>Name</TableCell>
                                                <TableCell align="right">
                                                    Description
                                                </TableCell>
                                                <TableCell align="right">
                                                    Created
                                                </TableCell>
                                                <TableCell align="right">
                                                    Owner
                                                </TableCell>
                                                <TableCell align="right">
                                                    Quantity
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {box.items.map(
                                                (
                                                    containedItem: StorageAPI.Item
                                                ) => (
                                                    <TableRow
                                                        key={containedItem._id}
                                                    >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {containedItem.name}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {
                                                                containedItem.description
                                                            }
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {
                                                                containedItem.created
                                                            }
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {containedItem.owner ||
                                                                ''}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {containedItem.quantity ||
                                                                1}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        ) : (
                            <CreateBox setBox={setBox} />
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </div>
    );
}
