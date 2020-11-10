import React from 'react';
import { useState } from 'react';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import Search from './Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    hight: "100vh",
  },
  table: {
    minWidth: 650,
  },
}));

interface Item {
  _id: string,
  name: string,
  description: string,
  owner: string | undefined,
  quantity: Number | undefined,
  created: Date,
}

interface Box {
  _id: string,
  items: Item[],
  location: string,
  created: Date,
  updated: Date[],
}



function App() {
  const classes = useStyles();

  const [loading, setLoading] = useState<boolean>(false);
  const [box, setBox] = useState<Box|undefined>(undefined);

  function handleSubmit(boxId: string) {
    setLoading(true);
    fetch(`http://localhost:8080/storage/box?id=${boxId}`).then(res => {
      res.json().then(json => {
        console.log(json);
        setBox(json);
      })
    }).catch(err => {
      console.log(err);
      setLoading(false);
    });
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Search hook={handleSubmit} disabled={loading}></Search>
            </Paper>
            {
              box !== undefined? 
              <Paper className={classes.paper}>
                {box._id}<br />
                {box.location}<br />
                {box.created}<br />
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Created</TableCell>
                        <TableCell align="right">Owner</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {box.items.map((item: Item) => (
                        <TableRow key={item._id}>
                          <TableCell component="th" scope="row">
                            {item.name}
                          </TableCell>
                          <TableCell align="right">{item.description}</TableCell>
                          <TableCell align="right">{item.created}</TableCell>
                          <TableCell align="right">{item.owner || ""}</TableCell>
                          <TableCell align="right">{item.quantity || 1}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>:<></>
            }
        </Grid>
      </Grid>
      
    </div>
  );
}

export default App;
