import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import Item from "./Item";
import { ItemProp } from "./Item";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
}));

interface ListProps {
  items: Array<ItemProp>;
  deleteItem: (id: string) => void;
  checkItem: (id: string) => void;
  uncheckItem: (id: string) => void;
}

export default function List({
  items,
  deleteItem,
  checkItem,
  uncheckItem,
}: ListProps) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell padding="checkbox"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <Item
              item={item}
              deleteItem={deleteItem}
              checkItem={checkItem}
              uncheckItem={uncheckItem}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
