import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { ShoppingItem } from "./api";
import { getShopping } from "./api";

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

const columns = [
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'quantity', headerName: 'Quantity', width: 130, valueGetter: (params: any) => `${params.getValue('quantity')} ${params.getValue('measure')}`}
];

export default function Shopping() {
    const classes = useStyles();

    const [ items, setItems ] = useState<Array<ShoppingItem>>([]);

    useEffect(() => {
        getShopping().then((items: Array<ShoppingItem>) => {
        setItems(items.map((item: ShoppingItem) => {return{id: item._id, ...item}}));
        }).catch(console.log);
    }, []);



    return (
        <div className={classes.root}>
            <br />
            <Grid container spacing={3} justify="center" alignItems="center">
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper>
                        Shopping
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid rows={items as any} columns={columns} pageSize={5} checkboxSelection />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </div>
    );
}
