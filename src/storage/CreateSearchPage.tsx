import React from 'react';
import { useState } from 'react';

import { Box } from '../lib/storage';
import { Item } from '../lib/storage';
import Search from '../Search';
import CreateBox from './CreateBox';

interface Props {
    setResult: (result: Box.Registered | Item.Registered) => void;
}

export default function CreateSearchPage({ setResult }: Props) {
    const [loading, setLoading] = useState<boolean>(false);

    function handleSubmit(option: Box.Registered | Item.Registered | null) {
        if (option === null) return;

        setLoading(true);
        if ((option as Box.Registered).label) {
            setResult(option as Item.Registered);
            setLoading(false);
            return;
        }

        Box.get(option._id).then((result) => {
            setResult(result);
            setLoading(false);
        });
    }

    return (
        <>
            <Search hook={handleSubmit} disabled={loading}></Search>
            <CreateBox setBox={setResult} />
        </>
    );
}
