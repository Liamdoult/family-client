import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import BoxIcon from './assets/box.svg';
import { Box } from './lib/storage';
import { Item } from './lib/storage';
import { Storage as StorageAPI } from './api';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
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
        '&&&:before': {
            borderBottom: 'none',
        },
        '&&:after': {
            borderBottom: 'none',
        },
    },
}));

interface SearchProps {
    hook: (value: Box.Registered | Item.Registered | null) => any;
    disabled?: boolean;
}

export default function Search(props: SearchProps) {
    const classes = useStyles();
    const [value, setValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<
        Array<Box.Registered | Item.Registered>
    >([]);

    const { hook, disabled } = props;

    useEffect(() => {
        if (value === '') return;
        setLoading(true);
        StorageAPI.search(value).then((res) => {
            let results: Array<Box.Registered | Item.Registered> = [];
            results = results.concat(res.boxes);
            results = results.concat(res.items);
            setOptions(results);
            setLoading(false);
        });
    }, [value]);

    function handleChange(
        event: object,
        value: string | Box.Registered | Item.Registered | null,
        reason: string
    ) {
        if (reason === 'select-option') {
            if (typeof value !== 'string') {
                hook(value);
            }
        }
    }
    function renderItem(item: Item.Registered) {
        return <div>{item.name}</div>;
    }

    function renderBox(box: Box.Registered) {
        return (
            <Grid style={{ width: '100%' }} container spacing={3}>
                <Grid
                    item
                    style={{ width: '50px', height: '100%' }}
                    alignContent="center"
                >
                    <img src={BoxIcon}></img>
                </Grid>
                <Grid item style={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        {box.label}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="caption" display="block" gutterBottom>
                        {box.location}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        {box.items.length}
                    </Typography>
                </Grid>
            </Grid>
        );
    }

    return (
        <Autocomplete
            id="search-ac"
            freeSolo
            // open={true}
            disabled={disabled}
            options={options}
            loading={loading}
            getOptionLabel={(option: Box.Registered | Item.Registered) =>
                (option as Item.Registered).name ||
                (option as Box.Registered).label
            }
            renderOption={(option: Box.Registered | Item.Registered) => {
                if ((option as Item.Registered).name)
                    return renderItem(option as Item.Registered);
                else return renderBox(option as Box.Registered);
            }}
            filterOptions={(options, state) => options}
            style={{ width: '100$' }}
            onChange={handleChange}
            renderInput={(params: any) => (
                <Paper component="form" className={classes.root}>
                    <TextField
                        {...params}
                        className={classes.input}
                        placeholder="Search"
                        onChange={(event) => setValue(event.target.value)}
                        autoComplete="off"
                    />
                    <IconButton
                        className={classes.iconButton}
                        aria-label="search"
                        disabled={disabled}
                    >
                        <SearchIcon />
                    </IconButton>
                </Paper>
            )}
        />
    );
}
