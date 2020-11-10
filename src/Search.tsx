import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
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
    hook: (value: string) => any,
    disabled?: boolean,
}

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
  label: string,
  items: Item[],
  location: string,
  created: Date,
  updated: Date[],
}


export default function Search(props: SearchProps) {
  const classes = useStyles();
  const [ value, setValue ] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ options, setOptions ] = useState<string[]>([]);

  const { hook, disabled } = props;

  useEffect(() => {
    if (value === "") return;
    setLoading(true);
    (async () => {
      const res = await fetch(`http://localhost:8080/storage/search?term=${value}`);
      const json = await res.json();
      let results: string[] = [];
      if (json.items) results = results.concat(json.items.map((item: {name: string, label: string}) => item.name || item.label));
      setOptions(results);
      setLoading(false);
    })()
  }, [value]);

  return (
    <Autocomplete
      id="search-ac"
      freeSolo
      // open={true}
      options={options}
      loading={loading}
      getOptionLabel={(option) => option}
      filterOptions={(options, state) => options}
      style={{ width: 400 }}
      renderInput={(params: any) => (
        <Paper component="form" className={classes.root}>
            <TextField
                {...params}
                className={classes.input}
                placeholder="Search"
                onChange={ event => setValue(event.target.value) }
                autoComplete="off"
            />
            <IconButton onClick={ () => hook(value) } className={classes.iconButton} aria-label="search" disabled={disabled}>
                <SearchIcon />
            </IconButton>
        </Paper>
      )}
    />
  );
}