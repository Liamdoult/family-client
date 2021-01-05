import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';

import { Item } from '../lib/storage';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Button from '@material-ui/core/Button';

interface Props {
  addItem: (item: Item.Base) => Promise<boolean>;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function AddItem({ addItem }: Props) {
  const classes = useStyles();

  const itemNameInput = useRef<HTMLInputElement | null>(null);

  const [itemName, setItemName] = useState<string>('');
  const [itemDescription, setItemDescription] = useState<string>('');
  const [itemQuantity, setItemQuantity] = useState<string>('');
  const [itemOwner, setItemOwner] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [itemNameError, setItemNameError] = useState<boolean>(false);
  const [itemDescriptionError, setItemDescriptionError] = useState<boolean>(
    false
  );
  const [itemQuantityError, setItemQuantityError] = useState<boolean>(false);
  const [itemOwnerError, setItemOwnerError] = useState<boolean>(false);

  function submit() {
    setLoading(true);
    const quantity = parseInt(itemQuantity);

    // Mark fields if invalid
    if (!itemName) setItemNameError(true);
    if (!quantity) setItemQuantityError(true);

    // Exit if invalid
    if (!itemName || !quantity) {
      if (itemNameInput && itemNameInput.current) itemNameInput.current.focus();
      return setLoading(false);
    }

    addItem({
      name: itemName,
      description: itemDescription,
      quantity: quantity,
      owner: itemOwner,
    }).then((success) => {
      if (success) {
        setItemName('');
        setItemDescription('');
        setItemQuantity('');
        setItemOwner('');

        setItemNameError(false);
        setItemDescriptionError(false);
        setItemQuantityError(false);
        setItemOwnerError(false);

        setLoading(false);

        if (itemNameInput && itemNameInput.current)
          itemNameInput.current.focus();
      }
    });
  }

  return (
    <>
      <TextField
        id="standard-basic"
        label="Name"
        error={itemNameError}
        value={itemName}
        inputRef={itemNameInput}
        onChange={(event) => setItemName(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') submit();
        }}
      />
      <TextField
        id="standard-basic"
        label="Description"
        error={itemDescriptionError}
        value={itemDescription}
        onChange={(event) => setItemDescription(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') submit();
        }}
      />
      <TextField
        id="standard-basic"
        label="Quantity"
        error={itemQuantityError}
        value={itemQuantity}
        onChange={(event) => setItemQuantity(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') submit();
        }}
      />
      <TextField
        id="standard-basic"
        label="Owner"
        error={itemOwnerError}
        value={itemOwner}
        onChange={(event) => setItemOwner(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') submit();
        }}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        className={classes.button}
        startIcon={<PlaylistAddIcon />}
        onClick={submit}
      >
        Add
      </Button>
    </>
  );
}
