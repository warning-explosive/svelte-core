export interface Container {
    kind: string;
}

export interface GenericContainer<T> extends Container {
    value: T
}

export interface StringContainer extends GenericContainer<string> {
    kind: 'string',
}

export interface NumberContainer extends GenericContainer<number> {
    kind: 'number',
}

export interface BooleanContainer extends GenericContainer<boolean> {
    kind: 'boolean',
}

export interface DateContainer extends GenericContainer<Date> {
    kind: 'date',
}

export interface LinkContainer extends Container {
    kind: "link",
    type: string,
    id: string,
    caption: string
}

export interface MoneyContainer extends Container {
    kind: 'money'
    amount: number,
    currency: string
}

export type Containers =
    StringContainer
    | NumberContainer
    | BooleanContainer
    | DateContainer
    | LinkContainer
    | MoneyContainer

export type Entity = {
    id: StringContainer,
    [index: string]: Containers
}

export const createEntity = <T extends Record<PropertyKey, Containers>>(container: T) => container