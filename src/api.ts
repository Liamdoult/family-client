
export interface Item {
    _id: string,
    name: string,
    description: string,
    owner: string | undefined,
    quantity: Number | undefined,
    created: string,
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
    created: string,
    updated: string[],
}

export interface Box {
    _id: string,
    label: string,
    items: Item[],
    location: string,
    created: string,
    updated: string[],
}

export interface PartialShoppingItem {
    name: string;
    description: string;
    quantity: number;
    measure: string;
}

export interface ShoppingItem extends PartialShoppingItem {
    _id: string,
    onList: boolean,
    created: Date,
    purchased?: Date,
    deleted?: Date,
}

/**
 * Search the database for related boxes and items.
 * 
 * @param term Search term
 */
export async function search(term: string): Promise<{boxes: Array<PartialBox>, items: Array<Item>}> {
    const res = await fetch(`http://localhost:8080/storage/search?term=${term}`);
    return await res.json() as {boxes: Array<PartialBox>, items: Array<Item>};
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
export async function createBox(label: string, location: string) : Promise<Box> {
    const res = await fetch(`http://localhost:8080/storage/box`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({location, label})
    });
    const json = await res.json();
    return json as Box;
}

/**
 * Get a list of all shopping items that are still required.
 */
export async function getShopping(): Promise<Array<ShoppingItem>> {
    const res = await fetch(`http://localhost:8080/shopping`);
    const json = await res.json();
    return json.items as Array<ShoppingItem>;
}


/**
 * Register new items to the shopping list. 
 * 
 * @param items List of items that need to be added to the shopping list.
 */
export async function createItems(items: Array<PartialShoppingItem>) : Promise<Array<ShoppingItem>> {
    const res = await fetch(`http://localhost:8080/shopping`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({items})
    });
    const json = await res.json();
    return json.items as Array<ShoppingItem>;
}

/**
 * Delete an item.
 *
 * @param item The item that needs to be deleted.
 */
export async function deleted(item: ShoppingItem) {
    await fetch(`http://localhost:8080/shopping?id=${item._id}`, {
        method: "DELETE",
    });

}

/**
 * Mark an item as purchased.
 * 
 * @param item The item that needs to be marked.
 */
export async function purchased(item: ShoppingItem) {
    await fetch(`http://localhost:8080/shopping?id=${item._id}&purchased`, {
        method: "PATCH",
    });

}

