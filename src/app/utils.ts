export function deleteNthItem<T>(array: T[], index: number): T | undefined {
    const deletedItems = array.splice(index, 1);
    if (deletedItems.length === 1) {
        return deletedItems[0];
    }
}

export function* mergeIterator<T>(arrays: T[][]) {
    for (const array of arrays) {
        for (const item of array) {
            yield item;
        }
    }
}
