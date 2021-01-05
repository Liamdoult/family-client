import React from 'react';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Box } from '../lib/storage';
import { Item } from '../lib/storage';
import List from './List';
import AddItem from './AddItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
}));

interface ResultsPageProps {
  result: Box.Registered | Item.Registered;
}

function ItemResult({ item }: { item: Item.Registered }) {
  return <>{item ? <div>{item._id}</div> : <></>}</>;
}

function BoxResult({ box }: { box: Box.Registered }) {
  const classes = useStyles();

  const [items, setItems] = useState<Item.Registered[]>(box.items);

  function deleteItem(id: string) {
    /*StorageAPI.removeItems(box._id, [id]).then((updatedBox) =>
            setItems(updatedBox.items)
        );*/
  }

  async function addItem(item: Item.Base) {
    try {
      await box.addItem(item);
      setItems(box.items);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  return (
    <div className={classes.root}>
      {box._id}
      <br />
      {box.label}
      <br />
      {box.location}
      <br />
      {box.created}
      <br />
      <br />
      <List items={items} deleteItem={deleteItem} />
      <AddItem addItem={addItem} />
    </div>
  );
}

export default function ResultsPage({ result }: ResultsPageProps) {
  if ((result as Box.Registered).label)
    return <BoxResult box={result as Box.Registered} />;
  if ((result as Item.Registered).name)
    return <ItemResult item={result as Item.Registered} />;
  return <div>ERROR: ITEM TYPE NOT FOUND</div>;
}
