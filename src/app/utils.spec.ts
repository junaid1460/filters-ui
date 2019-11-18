import { deleteNthItem } from './utils';

describe('Utils Tests', () => {
    it('should create an instance', () => {
        const array = [1];
        deleteNthItem(array, 0);
        expect(array.length).toBe(0);
        array.push(4, 5, 6);
        deleteNthItem(array, 0);
        expect(array[0]).toBe(5);
        expect(array[1]).toBe(6);
    });
});
