import React from 'react';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ResultsPage from './ResultsPage';
import { Box } from '../lib/storage';
import { Item } from '../lib/storage';
import CreateSearchPage from './CreateSearchPage';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
  },
}));

export default function Storage() {
  const classes = useStyles();

  const [result, setResult] = useState<
    Box.Registered | Item.Registered | undefined
  >(undefined);

  function handleSetResult(result: Box.Registered | Item.Registered) {
    setResult(result);
  }

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
              <CreateSearchPage setResult={handleSetResult} />
            )}
          </Paper>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}
