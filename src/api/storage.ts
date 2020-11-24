export interface Item {
    _id: string;
    name: string;
    description: string;
    owner: string | undefined;
    quantity: Number | undefined;
    created: string;
}

/**
 * Reduced size version of Box.
 *
 * To reduce data size, items are only id references. If items need to be Item use `Box`.
 */
export interface PartialBox {
    _id: string;
    label: string;
    items: string[];
    location: string;
    created: string;
    updated: string[];
}

export interface Box {
    _id: string;
    label: string;
    items: Item[];
    location: string;
    created: string;
    updated: string[];
}

/**
 * Search the database for related boxes and items.
 *
 * @param term Search term
 */
export async function search(
    term: string
): Promise<{ boxes: Array<PartialBox>; items: Array<Item> }> {
    const res = await fetch(
        `http://localhost:8080/storage/search?term=${term}`
    );
    return (await res.json()) as {
        boxes: Array<PartialBox>;
        items: Array<Item>;
    };
}
/**
 * Get a box by its identifier.
 *
 * @param id Unique box identifier
 */
export async function getBox(id: string): Promise<Box> {
    const res = await fetch(`http://localhost:8080/storage/box?id=${id}`);
    const json = await res.json();
    return json as Box;
}

/**
 * Register a new box in the database.
 *
 * @param location The location of the box
 * @param label The label on the box
 */
export async function createBox(label: string, location: string): Promise<Box> {
    const res = await fetch(`http://localhost:8080/storage/box`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, label }),
    });
    const json = await res.json();
    return json as Box;
}
