export enum BaseObjectType {
    ITEM,
    BOX,
    PARTIALITEM,
    PARTIALBOX,
}

interface BaseObject {
    _id: string;
    type: BaseObjectType;
}

export interface Item extends BaseObject {
    name: string;
    description: string;
    owner: string | undefined;
    quantity: Number | undefined;
    created: string;
}

export interface UnregisteredItem {
    name: string;
    description: string;
    owner: string | undefined;
    quantity: Number | undefined;
}

interface _Box extends BaseObject {
    label: string;
    location: string;
    created: string;
    updated: string[];
}
/**
 * Reduced size version of Box.
 *
 * To reduce data size, items are only id references. If items need to be Item use `Box`.
 */
export interface PartialBox extends _Box {
    items: string[];
}

export interface Box extends _Box {
    items: Item[];
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
    const jsn = await res.json();
    return {
        boxes: jsn.boxes.map(
            (value: any) =>
                new Object({ type: BaseObjectType.PARTIALBOX, ...value })
        ),
        items: jsn.boxes.map(
            (value: any) => new Object({ type: BaseObjectType.ITEM, ...value })
        ),
    } as {
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
    return { type: BaseObjectType.BOX, ...json } as Box;
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
    return { type: BaseObjectType.BOX, ...json } as Box;
}

export async function updateBox(
    boxId: string,
    items: Array<UnregisteredItem>
): Promise<Box> {
    const res = await fetch(`http://localhost:8080/storage/box`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boxId, items }),
    });
    const json = await res.json();
    return { type: BaseObjectType.BOX, ...json } as Box;
}
