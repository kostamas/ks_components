import { ObservableArray } from './observable-array';
import { IOAEvent } from './utility/types';
import * as _ from 'lodash';

describe('ObservableArray testing', () => {
  let oa: ObservableArray<any>;
  let mockItemsArr;
  let mockItem;

  afterEach(() => {
    if (oa) {
      oa.destroy();
    }
  });

  describe('testing without identifier', () => {
    beforeEach(() => {
      mockItemsArr = [{id: 1}, {id: 2}, {id: 3}];
      mockItem = {id: 4};
      oa = new ObservableArray();
    });

    it('when initializing the oa with items then these items should be added', () => {
      oa.destroy();
      oa = new ObservableArray([...mockItemsArr]);
      expect(oa.arrayChange$.getValue()).toEqual(mockItemsArr);
    });

    it('when updating item or items that were not added yet then it should be added', () => {
      oa.update({...mockItem});
      const currArr = oa.arrayChange$.getValue();
      expect(currArr).toEqual([mockItem]);

      oa.destroy();
      oa = new ObservableArray();
      oa.update([...mockItemsArr]);
      expect(oa.arrayChange$.getValue()).toEqual(mockItemsArr);
    });

    it('when asking if item exists then true should be returned for added items', () => {
      oa.update(mockItem);

      expect(oa.isItemAdded(mockItem)).toBe(true);
      expect(oa.isItemAdded({id: 5})).toBe(false);
    });

    it('when resetting the oa then the provided value should set as the new value', () => {
      const newValue = [{id: 5}, {id: 6}];
      oa.update(mockItemsArr);
      oa.reset(newValue);
      expect(oa.arrayChange$.getValue()).toEqual(newValue);
    });

    it('when deleting an item it should be removed from the oa', () => {
      oa.update([...mockItemsArr]);
      const deletedItem = mockItemsArr[0];
      oa.delete(deletedItem);
      expect(oa.arrayChange$.getValue()).toEqual(mockItemsArr.slice(1));
      expect(oa.isItemAdded(deletedItem)).toBe(false);
    });
  });

  describe('testing with identifier', () => {
    beforeEach(() => {
      mockItemsArr = [{id: 1}, {id: 2}, {id: 3}];
      mockItem = {id: 4};
      oa = new ObservableArray(null, {itemIdentifier: 'id'});
    });

    it('when initializing the oa with items then these items should be added', () => {
      oa = new ObservableArray([...mockItemsArr]);
      expect(oa.arrayChange$.getValue()).toEqual(mockItemsArr);
    });

    it('when updating item or items that were not added yet then it should be added', () => {
      oa.update({...mockItem});
      const currArr = oa.arrayChange$.getValue();
      expect(currArr).toEqual([mockItem]);

      oa = new ObservableArray();
      oa.update([...mockItemsArr]);
      expect(oa.arrayChange$.getValue()).toEqual(mockItemsArr);
    });

    it('when asking if item exists then true should be returned for added items', () => {
      oa.update(mockItem);

      expect(oa.isItemAdded(mockItem)).toBe(true);
      expect(oa.isItemAdded({id: 5})).toBe(false);
    });

    it('when resetting the oa then the provided value should set as the new value', () => {
      const newValue = [{id: 5}, {id: 6}];
      oa.update(mockItemsArr);
      oa.reset(newValue);
      expect(oa.arrayChange$.getValue()).toEqual(newValue);
    });

    it('when deleting an item it should be removed from the oa', () => {
      oa.update([...mockItemsArr]);
      const deletedItem = mockItemsArr[0];
      oa.delete(deletedItem);
      expect(oa.arrayChange$.getValue()).toEqual(mockItemsArr.slice(1));
      expect(oa.isItemAdded(deletedItem)).toBe(false);
    });

    it('when editing an item then items order should remain', () => {
      oa.update([...mockItemsArr]);
      const secondItem = {...mockItemsArr[1]};
      oa.update(secondItem);
      expect(oa.arrayChange$.getValue()).toEqual(mockItemsArr);
    });
  });

  describe('D_I_Research arrayChange$ events', () => {
    let arrChangeEmitter;

    beforeEach(() => {
      mockItemsArr = [{id: 1}, {id: 2}, {id: 3}];
      mockItem = {id: 4};

      arrChangeEmitter = jasmine.createSpyObj('arrChangeEmitter ', ['emit']);
      oa = new ObservableArray(null, {itemIdentifier: 'id'});

      oa.arrayChange$.subscribe((arr) => {
        arrChangeEmitter.emit(arr);
      });
    });

    it('when initialing the oa then arrayChanges should emit empty array', () => {
      expect(arrChangeEmitter.emit).toHaveBeenCalledWith([]);
    });

    it('when adding new item then arrayChanges should emit accordingly', () => {
      oa.update([...mockItemsArr]);
      expect(arrChangeEmitter.emit.calls.allArgs()).toEqual([[[]], [mockItemsArr]]);
    });

    it('when deleting an item then arrayChanges should emit accordingly', () => {
      oa.update([...mockItemsArr]);
      const deletedItem = mockItemsArr[0];
      oa.delete(deletedItem);
      expect(arrChangeEmitter.emit.calls.allArgs()).toEqual([[[]], [mockItemsArr], [mockItemsArr.slice(1)]]);
    });
  });

  describe('D_I_Research itemsUpdates$ events', () => {
    let arrChangeEmitter;

    beforeEach(() => {
      mockItemsArr = [{id: 1}, {id: 2}, {id: 3}];
      mockItem = {id: 4};

      arrChangeEmitter = jasmine.createSpyObj('arrChangeEmitter ', ['emit']);
      oa = new ObservableArray(null, {itemIdentifier: 'id'});

      oa.itemsUpdates$.subscribe((updatedItem) => {
        arrChangeEmitter.emit(updatedItem);
      });
    });

    it('when initialing the oa then itemsUpdates$ should emit empty array', () => {
      expect(arrChangeEmitter.emit).not.toHaveBeenCalled();
    });

    it('when adding new item then itemsUpdates$ should emit accordingly', () => {
      oa.update({...mockItem});
      const expectedResult: [IOAEvent<{ id: number }>][] = [
        [{
          type: 'ADD',
          item: mockItem
        }]
      ];
      expect(arrChangeEmitter.emit.calls.allArgs()).toEqual(expectedResult);
    });

    it('when deleting an item then itemsUpdates$ should emit accordingly', () => {
      oa.update([...mockItemsArr]);
      const deletedItem = mockItemsArr[0];
      oa.delete(deletedItem);
      const expectedResult: [IOAEvent<{ id: number }>][] = [
        [{
          type: 'ADD',
          item: {id: 1}
        }],
        [{
          type: 'ADD',
          item: {id: 2}
        }],
        [{
          type: 'ADD',
          item: {id: 3}
        }],
        [{
          type: 'DELETE',
          item: deletedItem
        }]
      ];
      expect(arrChangeEmitter.emit.calls.allArgs()).toEqual(expectedResult);
    });

    it('when updating an item then itemsUpdates$ should emit accordingly', () => {
      oa.update(mockItem);
      const updatedItem = {id: mockItem.id, newProp: 'new'};
      oa.update(updatedItem);
      const expectedResult: [IOAEvent<{ id: number }>][] = [
        [{
          type: 'ADD',
          item: mockItem
        }], [{
          type: 'EDIT',
          item: updatedItem
        }]
      ];
      expect(arrChangeEmitter.emit.calls.allArgs()).toEqual(expectedResult);
    });
  });

  describe('performance tests', () => {
    const MAX_EXECUTION_TIME_IN_MS_FOR_BATCH_UPDATE = 1000;
    const ITEMS_NUM = 100000;
    beforeEach(() => {
      mockItemsArr = [];
      let itemsNum = ITEMS_NUM;
      while (itemsNum--) {
        mockItemsArr.push({
          id: itemsNum
        });
      }

      oa = new ObservableArray(null, {itemIdentifier: 'id'});
      oa.arrayChange$.subscribe(() => null);
      oa.itemsUpdates$.subscribe(() => null);
    });

    it('adding performance D_I_Research', () => {
      const start = performance.now();
      oa.update(mockItemsArr);
      const executionTime = performance.now() - start;
      expect(executionTime).toBeLessThan(MAX_EXECUTION_TIME_IN_MS_FOR_BATCH_UPDATE);
    });

    it('deleting performance D_I_Research', () => {
      oa.update(mockItemsArr);
      const start = performance.now();
      oa.delete(mockItemsArr);
      const executionTime = performance.now() - start;
      expect(executionTime).toBeLessThan(MAX_EXECUTION_TIME_IN_MS_FOR_BATCH_UPDATE);
    });

    it('editing performance D_I_Research', () => {
      oa.update(mockItemsArr);
      const mockItemsArrClone = _.map(mockItemsArr, (item) => {
        return {...item};
      });
      const start = performance.now();
      oa.update(mockItemsArrClone);
      const executionTime = performance.now() - start;
      expect(executionTime).toBeLessThan(MAX_EXECUTION_TIME_IN_MS_FOR_BATCH_UPDATE);
    });
  });
});
