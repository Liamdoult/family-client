import React from 'react';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ResultsPage from './ResultsPage';
import { Box } from './ResultsPage';
import { Item } from './ResultsPage';
import CreateSearchPage from './CreateSearchPage';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    table: {
        minWidth: 650,
    },
}));

export default function Storage() {
    const classes = useStyles();

    const [result, setResult] = useState<Box | Item | undefined>(undefined);

    return (
        <div className={classes.root}>
            <br />
            <Grid container spacing={3} justify="center" alignItems="center">
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper>
                        {result ? (
                            <ResultsPage result={result} />
                        ) : (
                            <CreateSearchPage />
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </div>
    );
}
