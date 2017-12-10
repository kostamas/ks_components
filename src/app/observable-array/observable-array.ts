import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { Dictionary } from 'lodash';
import {
  IOAConfig,
  IOAEvent
} from './utility/types';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ObservableArray<T> {
  private items: T[];
  private addedItemsMap: Map<any, T>;

  readonly itemsUpdates$: Subject<IOAEvent<T>>;
  readonly arrayChange$: BehaviorSubject<T[]>;

  constructor(initArray: T[] = [],
              private config: IOAConfig = {}) {
    this.itemsUpdates$ = new Subject();
    this.arrayChange$ = new BehaviorSubject([]);

    this.reset(initArray);
  }

  private triggerEvent(event: IOAEvent<T>) {
    this.itemsUpdates$.next(event);
  }

  private getItemIdentifier(item: T) {
    const identifier = this.config.itemIdentifier;

    if (!this.config.itemIdentifier) {
      return item;
    }

    if (_.isString(identifier)) {
      return _.at(<Dictionary<any>>item, identifier)[0];
    }
  }

  private getItemFromMap(item: T): T {
    const identifier = this.getItemIdentifier(item);
    return this.addedItemsMap.get(identifier);
  }

  private notifyArrayChanged() {
    this.arrayChange$.next([...this.items]);
  }

  private _update(newItemOrItems: T | T[]) {
    const currItemIdentifierToIndexInArrMap = new Map<any, number>();
    _.forEach(this.items, (item, index) => {
      currItemIdentifierToIndexInArrMap.set(this.getItemIdentifier(item), index);
    });

    const itemsArrToEdit: T[] = newItemOrItems instanceof Array ? newItemOrItems : [newItemOrItems];

    _.forEach(itemsArrToEdit, (itemToEdit) => {
      const itemToEditIdentifier = this.getItemIdentifier(itemToEdit);
      const itemIndexInCurrArr = currItemIdentifierToIndexInArrMap.get(itemToEditIdentifier);

      if (_.isNil(itemIndexInCurrArr)) {
        this.items.push(itemToEdit);
      } else {
        this.items[itemIndexInCurrArr] = itemToEdit;
      }

      this.addedItemsMap.set(itemToEditIdentifier, itemToEdit);

      const event: IOAEvent<T> = {
        item: itemToEdit,
        type: _.isNil(itemIndexInCurrArr) ? 'ADD' : 'EDIT'
      };
      this.triggerEvent(event);
    });

    if (itemsArrToEdit.length) {
      this.notifyArrayChanged();
    }
  }

  private _delete(itemOrItems: T | T[]) {
    const itemsToDeleteArr = _.isArray(itemOrItems) ? itemOrItems : [itemOrItems];

    const itemsToDeleteIdentifiersMap = new Map<any, T>();
    _.forEach(itemsToDeleteArr, (item: T) => {
      itemsToDeleteIdentifiersMap.set(this.getItemIdentifier(item), item);
    });

    const currItems = this.items;

    // find deleted items and remove deleted items from this.items array and addedItemsMap
    this.items = [];
    const deletedItems: T[] = [];
    _.forEach(currItems, (item) => {
      const itemIdentifier = this.getItemIdentifier(item);
      if (itemsToDeleteIdentifiersMap.has(itemIdentifier)) {
        deletedItems.push(item);
        this.addedItemsMap.delete(itemIdentifier);
      } else {
        this.items.push(item);
      }
    });

    // trigger item change event for each deleted item
    _.forEach(deletedItems, (deletedItem) => {
      const event: IOAEvent<T> = {
        type: 'DELETE',
        item: deletedItem
      };
      this.triggerEvent(event);
    });

    // notify array change only if at lease 1 item was deleted
    if (deletedItems.length) {
      this.notifyArrayChanged();
    }
  }

  isItemAdded(item: T) {
    return !!this.getItemFromMap(item);
  }

  reset(itemsArr: T[]) {
    if (!itemsArr) {
      itemsArr = [];
    }

    this.items = [];
    this.addedItemsMap = new Map();
    this.update(itemsArr);
  }

  update(itemOrItems: T | T[]) {
    this._update(itemOrItems);
  }

  delete(itemOrItems: T | T[]) {
    this._delete(itemOrItems);
  }

  destroy() {
    this.itemsUpdates$.complete();
    this.arrayChange$.complete();
  }
}
