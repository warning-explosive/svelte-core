export interface DataContainer {
    kind: string;
    validate?: () => string;
}

export interface GenericDataContainer<T> extends DataContainer {
    value: T
}

export interface StringDataContainer extends GenericDataContainer<string> {
    kind: 'string',
}

export interface NumberDataContainer extends GenericDataContainer<number> {
    kind: 'number',
}

export interface BooleanDataContainer extends GenericDataContainer<boolean> {
    kind: 'boolean',
}

export interface DateDataContainer extends GenericDataContainer<Date> {
    kind: 'date',
}

export interface LinkDataContainer extends DataContainer {
    kind: "link",
    type: string,
    id: string,
    caption: string
}

export interface MoneyDataContainer extends DataContainer {
    kind: 'money'
    amount: number,
    currency: string
}

export type DataContainers =
    StringDataContainer
    | NumberDataContainer
    | BooleanDataContainer
    | DateDataContainer
    | LinkDataContainer
    | MoneyDataContainer

export type Entity = {
    id: StringDataContainer,
    [index: string]: DataContainers
}

export const createEntity = <T extends Record<PropertyKey, DataContainers>>(container: T) => container