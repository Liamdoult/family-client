import React from 'react';
import { useState } from 'react';

import { Storage as StorageAPI } from '../api';
import Search from '../Search';
import CreateBox from './CreateBox';

export default function CreateSearchPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [box, setBox] = useState<StorageAPI.Box | undefined>(undefined);
    const [item, setItem] = useState<StorageAPI.Item | undefined>(undefined);

    function handleSubmit(
        option: StorageAPI.PartialBox | StorageAPI.Item | null
    ) {
        setLoading(true);
        if ((option as StorageAPI.Item).name) {
            setBox(undefined);
            setItem(option as StorageAPI.Item);
            setLoading(false);
        }
        if ((option as StorageAPI.PartialBox).label) {
            setItem(undefined);
            StorageAPI.getBox((option as StorageAPI.PartialBox)._id).then(
                (box) => {
                    setBox(box);
                    setLoading(false);
                }
            );
        }
    }

    return (
        <>
            <Search hook={handleSubmit} disabled={loading}></Search>
            <CreateBox setBox={setBox} />
        </>
    );
}
