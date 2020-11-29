import React from 'react';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Storage as StorageAPI } from '../api';
import List from './List';

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
    result: StorageAPI.Box | StorageAPI.Item;
}

function ItemResult({ item }: { item: StorageAPI.Item }) {
    return <>{item ? <div>{item._id}</div> : <></>}</>;
}

function BoxResult({ box }: { box: StorageAPI.Box }) {
    const classes = useStyles();

    const [items, setItems] = useState<StorageAPI.Item[]>(box.items);

    function deleteItem(id: string) {}

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
        </div>
    );
}

export default function ResultsPage({ result }: ResultsPageProps) {
    if (result.type === StorageAPI.BaseObjectType.BOX)
        return <BoxResult box={result as StorageAPI.Box} />;
    if (result.type === StorageAPI.BaseObjectType.ITEM)
        return <ItemResult item={result as StorageAPI.Item} />;
    return <div>ERROR: ITEM TYPE NOT FOUND</div>;
}
