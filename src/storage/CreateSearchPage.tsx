import React from 'react';
import { useState } from 'react';

import { Storage as StorageAPI } from '../api';
import Search from '../Search';
import CreateBox from './CreateBox';

interface Props {
    setResult: (result: StorageAPI.Box | StorageAPI.Item) => void;
}

export default function CreateSearchPage({ setResult }: Props) {
    const [loading, setLoading] = useState<boolean>(false);

    function handleSubmit(
        option: StorageAPI.PartialBox | StorageAPI.Item | null
    ) {
        if (option === null) return;

        setLoading(true);
        if (option.type !== StorageAPI.BaseObjectType.PARTIALBOX) {
            setResult(option as StorageAPI.Item);
            setLoading(false);
            return;
        }

        StorageAPI.getBox(option._id).then((result) => {
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
