import React from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Checkbox from "@material-ui/core/Checkbox";

export interface ItemProp {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  measure: string;
}

interface ItemProps {
  item: ItemProp;
  deleteItem: (id: string) => void;
  checkItem: (id: string) => void;
  uncheckItem: (id: string) => void;
}

export default function Item({
  item,
  deleteItem,
  checkItem,
  uncheckItem,
}: ItemProps) {
  function markChecked(isChecked: boolean) {
    if (isChecked) return checkItem(item._id);
    return uncheckItem(item._id);
  }

  return (
    <TableRow key={item._id}>
      <TableCell padding="checkbox">
        <Checkbox
          inputProps={{ "aria-labelledby": item._id }}
          onChange={(event) => markChecked(event.target.checked)}
        />
      </TableCell>
      <TableCell style={{ width: "100" }} component="th" scope="row">
        {item.name}
      </TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell align="right">{`${item.quantity} ${item.measure}`}</TableCell>
      <TableCell
        padding="checkbox"
        align="right"
        onClick={() => deleteItem(item._id)}
      >
        <DeleteForeverIcon />
      </TableCell>
    </TableRow>
  );
}
