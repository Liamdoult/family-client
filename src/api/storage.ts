import { Box } from '../lib/storage';
import { Item } from '../lib/storage';
/**
 * Search the database for related boxes and items.
 *
 * @param term Search term
 */
export async function search(
  term: string
): Promise<{ boxes: Array<Box.Registered>; items: Array<Item.Registered> }> {
  const res = await fetch(`http://localhost:8080/storage/search?term=${term}`);
  const jsn = await res.json();
  return {
    boxes: jsn.boxes.map((box: any) => new Box.Registered(box)),
    items: jsn.items.map((item: any) => new Item.Registered(item)),
  } as {
    boxes: Array<Box.Registered>;
    items: Array<Item.Registered>;
  };
}
