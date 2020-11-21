export interface PartialItem {
    name: string;
    description: string;
    quantity: number;
    measure: string;
}

export interface Item extends PartialItem {
    _id: string,
    onList: boolean,
    created: Date,
    purchased?: Date,
    deleted?: Date,
}


/**
 * Get a list of all shopping items that are still required.
 */
export async function get(): Promise<Array<Item>> {
    const res = await fetch(`http://localhost:8080/shopping`);
    const json = await res.json();
    return json.items as Array<Item>;
}


/**
 * Register new items to the shopping list. 
 * 
 * @param items List of items that need to be added to the shopping list.
 */
export async function create(items: Array<PartialItem>) : Promise<Array<Item>> {
    const res = await fetch(`http://localhost:8080/shopping`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({items})
    });
    const json = await res.json();
    return json.items as Array<Item>;
}

/**
 * Delete an item.
 *
 * @param item The item that needs to be deleted.
 */
export async function deleted(item: Item) {
    await fetch(`http://localhost:8080/shopping?id=${item._id}`, {
        method: "DELETE",
    });

}

/**
 * Mark an item as purchased.
 * 
 * @param item The item that needs to be marked.
 */
export async function purchased(item: Item) {
    await fetch(`http://localhost:8080/shopping?id=${item._id}&purchased`, {
        method: "PATCH",
    });
}

