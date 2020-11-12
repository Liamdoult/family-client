import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { Item } from './api';
import { PartialBox } from './api';
import { search } from './api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  }
}));

interface SearchProps {
    hook: (value: PartialBox | Item | null) => any,
    disabled?: boolean,
}

export default function Search(props: SearchProps) {
  const classes = useStyles();
  const [ value, setValue ] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ options, setOptions ] = useState<Array<PartialBox | Item>>([]);

  const { hook, disabled } = props;

  useEffect(() => {
    if (value === "") return;
    setLoading(true);
    search(value).then(res => {
      let results: Array<PartialBox | Item> = [];
      results = results.concat(res.boxes);
      results = results.concat(res.items);
      setOptions(results);
      setLoading(false);
    });
  }, [value]);

  function handleChange(event: object, value: string | PartialBox | Item | null, reason: string) {
    if (reason === "select-option") {
      if (typeof(value) !== "string") {
        hook(value);
      }
    }
  }

  return (
    <Autocomplete
      id="search-ac"
      freeSolo
      // open={true}
      disabled={disabled}
      options={options}
      loading={loading}
      getOptionLabel={(option: PartialBox | Item) => (option as Item).name || (option as PartialBox).label}
      filterOptions={(options, state) => options}
      style={{ width: "100$" }}
      onChange={handleChange}
      renderInput={(params: any) => (
        <Paper component="form" className={classes.root}>
            <TextField
                {...params}
                className={classes.input}
                placeholder="Search"
                onChange={ event => setValue(event.target.value) }
                autoComplete="off"
            />
            <IconButton className={classes.iconButton} aria-label="search" disabled={disabled}>
                <SearchIcon />
            </IconButton>
        </Paper>
      )}
    />
  );
}