import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";

import { Shopping as ShoppingAPI } from "../api";

import List from "./List";

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

export default function Shopping() {
  const classes = useStyles();

  const itemNameInput = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<Array<ShoppingAPI.Item>>([]);

  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<string>("");
  const [itemMeasure, setItemMeasure] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [itemNameError, setItemNameError] = useState<boolean>(false);
  const [itemDescriptionError, setItemDescriptionError] = useState<boolean>(
    false
  );
  const [itemQuantityError, setItemQuantityError] = useState<boolean>(false);
  const [itemMeasureError, setItemMeasureError] = useState<boolean>(false);

  function updateItems() {
    ShoppingAPI.get()
      .then((items: Array<ShoppingAPI.Item>) => {
        setItems(
          items.map((item: ShoppingAPI.Item) => {
            return { id: item._id, ...item };
          })
        );
      })
      .catch(console.log);
  }

  useEffect(updateItems, []);

  function uploadItem() {
    setLoading(true);
    const quantity = parseInt(itemQuantity);

    // Mark fields if invalid
    if (!itemName) setItemNameError(true);
    if (!quantity) setItemQuantityError(true);
    if (!itemMeasure) setItemMeasureError(true);

    // Exit if invalid
    if (!itemName || !itemMeasure || !quantity) {
      if (itemNameInput && itemNameInput.current) itemNameInput.current.focus();
      return setLoading(false);
    }

    ShoppingAPI.create([
      {
        name: itemName,
        description: itemDescription || "",
        quantity: quantity,
        measure: itemMeasure,
      },
    ]).then(() => {
      updateItems();
      setItemName("");
      setItemDescription("");
      setItemQuantity("");
      setItemMeasure("");

      setItemNameError(false);
      setItemDescriptionError(false);
      setItemQuantityError(false);
      setItemMeasureError(false);

      setLoading(false);

      if (itemNameInput && itemNameInput.current) itemNameInput.current.focus();
    });
  }

  function deleteItem(id: string) {
    ShoppingAPI.deleted(id).then(() =>
      setItems(items.filter((item) => item._id !== id))
    );
  }

  function checkItem(id: string) {
    ShoppingAPI.purchased(id).then(() => {});
  }

  function uncheckItem(_: string) {
    return;
  }

  return (
    <div className={classes.root}>
      <br />
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h1>Shopping</h1>
            <br />
            <br />
            <div style={{ width: "100%" }}>
              <List
                items={items}
                deleteItem={deleteItem}
                checkItem={checkItem}
                uncheckItem={uncheckItem}
              />
            </div>
            <br />
            <TextField
              id="standard-basic"
              label="Name"
              error={itemNameError}
              value={itemName}
              inputRef={itemNameInput}
              onChange={(event) => setItemName(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") uploadItem();
              }}
            />
            <TextField
              id="standard-basic"
              label="Description"
              error={itemDescriptionError}
              value={itemDescription}
              onChange={(event) => setItemDescription(event.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Quantity"
              error={itemQuantityError}
              value={itemQuantity}
              onChange={(event) => setItemQuantity(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") uploadItem();
              }}
            />
            <TextField
              id="standard-basic"
              label="Measure"
              error={itemMeasureError}
              value={itemMeasure}
              onChange={(event) => setItemMeasure(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") uploadItem();
              }}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
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
