import { getBox } from "./api";
import { createBox } from "./api";

test("create box", async () => {
    const box = await createBox("Test location", "TEST1")
    const retrievedBox = await getBox(box._id);
    expect(box).toEqual(retrievedBox);
})