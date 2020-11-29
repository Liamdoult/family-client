import React from 'react';
import { useState } from 'react';
import { ChangeEvent } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Storage as StorageAPI } from '../api';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

interface CreateBoxProps {
    setBox: (box: StorageAPI.Box) => void;
}

export default function CreateBox(props: CreateBoxProps) {
    const classes = useStyles();

    const [label, setLabel] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    const { setBox } = props;

    function submit() {
        StorageAPI.createBox(label, location).then(setBox);
    }

    return (
        <div className={classes.root}>
            <TextField
                id="standard-full-width"
                label="label"
                style={{ margin: 8 }}
                placeholder=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(
                    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setLabel(event.target.value)}
            />
            <TextField
                id="standard-full-width"
                label="location"
                style={{ margin: 8 }}
                placeholder=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(
                    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setLocation(event.target.value)}
            />
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={submit}
            >
                Submit
            </Button>
        </div>
    );
}
