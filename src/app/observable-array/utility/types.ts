export type TEventType = 'ADD' | 'EDIT' | 'DELETE';

export interface IOAEvent<T> {
    type: TEventType;
    item: T;
}

export type TItemIdentifier = string;

export interface IOAConfig {
    itemIdentifier?: TItemIdentifier;
}
