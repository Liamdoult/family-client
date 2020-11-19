import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button'; 

import { ShoppingItem } from "./api";
import { getShopping } from "./api";
import { createItems } from "./api";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      hight: "100vh",
    },
    table: {
      minWidth: 650,
    },
    button: {
      margin: theme.spacing(1),
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

    const [ itemName, setItemName ] = useState<string|undefined>(undefined);
    const [ itemDescription, setItemDescription ] = useState<string|undefined>(undefined);
    const [ itemQuantity, setItemQuantity ] = useState<number|undefined>(undefined);
    const [ itemMeasure, setItemMeasure ] = useState<string|undefined>(undefined);

    const [ itemNameError, setItemNameError ] = useState<boolean>(false);
    const [ itemDescriptionError, setItemDescriptionError ] = useState<boolean>(false);
    const [ itemQuantityError, setItemQuantityError ] = useState<boolean>(false);
    const [ itemMeasureError, setItemMeasureError ] = useState<boolean>(false);

    function updateItems() {
       getShopping().then((items: Array<ShoppingItem>) => {
        setItems(items.map((item: ShoppingItem) => {return{id: item._id, ...item}}));
        }).catch(console.log);
    }

    useEffect(updateItems, []);

    function uploadItem() {
        // Mark fields if invalid
        if (!itemName) setItemNameError(true);
        if (!itemQuantity) setItemQuantityError(true);
        if (!itemMeasure) setItemMeasureError(true);
        
        // Exit if invalid
        if (!itemName || !itemQuantity || !itemMeasure) return;

        createItems([{
            name: itemName,
            description: itemDescription || "",
            quantity: itemQuantity,
            measure: itemMeasure,
        }]);

        updateItems();
    }

    return (
        <div className={classes.root}>
            <br />
            <Grid container spacing={3} justify="center" alignItems="center">
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <h1>Shopping</h1>
                        Items required at the next shopping trip.
                        <br />
                        <br />
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid rows={items as any} columns={columns} pageSize={5} checkboxSelection />
                        </div>
                        <br />
                        <TextField id="standard-basic" label="Name" error={itemNameError} onChange={event => setItemName(event.target.value)} />
                        <TextField id="standard-basic" label="Description" error={itemDescriptionError} onChange={event => setItemDescription(event.target.value)} />
                        <TextField id="standard-basic" label="Quantity" error={itemQuantityError} onChange={event => setItemQuantity(parseInt(event.target.value))} />
                        <TextField id="standard-basic" label="Measure" error={itemMeasureError} onChange={event => setItemMeasure(event.target.value)} />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<CloudUploadIcon />}
                            onClick={uploadItem}
                        >
                            Upload
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </div>
    );
}
