import {Readable, Writable, writable, get} from "svelte/store";
import type {Entity} from "./containers";

export type GridStoreStates = 'idling' | 'loading' | 'error';

export interface GridStoreData {
    state: GridStoreStates,
    data: Entity[] | Error,
    keys: string[]
}

export interface GridStore {
    store: Readable<GridStoreData>,
    refresh: () => void,
    getById: (id: string) => Entity | undefined;
}

const getGridData = (state: GridStoreStates, data?: Entity[] | Error, keys?: string[]) => {
    return {
        state: state,
        data: data || [],
        keys: keys || []
    };
};

export function createGridStore(url: string): GridStore {
    const store: Writable<GridStoreData> = writable(getGridData('idling'));

    fetchData(store, url);

    return {
        store: store,
        refresh: () => fetchData(store, url),
        getById: (id: string) => getById(store, id)
    };
}

function getById(store: Readable<GridStoreData>, id: string): Entity | undefined {
    const data = get(store).data;

    if (!data || data instanceof Error) {
        return undefined;
    } else {
        return data.find(item => item.id.value == id);
    }
}

async function fetchData<T>(store: Writable<GridStoreData>, url: string): Promise<void> {
    try {
        store.set(getGridData('loading'));

        const response = await fetch(url);
        const items: object[] = await response.json();
        const containers = items.map(objectsToContainers);
        const keys = getKeys(containers);

        store.set(getGridData('idling', containers, keys));
    }
    catch (error) {
        store.set(getGridData('error', error as Error));
    }
}

function getKeys(entity: Entity[]): string[] {
    return entity.length
        ? Object.keys(entity[0])
        : [];
}

function objectsToContainers(obj: { [index: string]:any }): Entity {

    let acc: Entity = {
        id: {
            kind: 'string',
            value: obj['id']
        }
    };

    return Object
        .keys(obj)
        .reduce((acc, key) => {
            const value = obj[key];

            if (typeof value === 'number') {
                acc[key] = { kind: 'number', value: value };
            } else {
                acc[key] = { kind: 'string', value: value };
            }

            return acc;
        }, acc);
}