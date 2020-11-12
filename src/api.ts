
export interface Item {
    _id: string,
    name: string,
    description: string,
    owner: string | undefined,
    quantity: Number | undefined,
    created: Date,
}

/**
 * Reduced size version of Box.
 * 
 * To reduce data size, items are only id references. If items need to be Item use `Box`.
 */
export interface PartialBox {
    _id: string,
    label: string,
    items: string[],
    location: string,
    created: Date,
    updated: Date[],
}

export interface Box {
    _id: string,
    label: string,
    items: Item[],
    location: string,
    created: Date,
    updated: Date[],
}

export async function search(term: string): Promise<{boxes: Array<PartialBox>, items: Array<Item>}> {
    const res = await fetch(`http://localhost:8080/storage/search?term=${term}`);
    return await res.json() as {boxes: Array<PartialBox>, items: Array<Item>};
}