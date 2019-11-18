export function deleteNthItem<T>(array: T[], index: number): T | undefined {
    const deletedItems = array.splice(index, 1);
    if (deletedItems.length === 1) {
        return deletedItems[0];
    }
}
