import {Writable, writable} from "svelte/store";
import type {Containers} from "./containers";

export type GridStoreStates = 'idling' | 'loading' | 'success' | 'error';

export interface GridStoreData {
    state: GridStoreStates,
    data: object[] | Error
}

export interface GridStore {
    store: Writable<GridStoreData>,
    refresh: () => void
}

export function createGridStore(url: string): GridStore {
    const store: Writable<GridStoreData> = writable({ state: 'idling', data: [] });

    fetchData(store, url);

    return {
        store: store,
        refresh: () => fetchData(store, url)
    };
}

async function fetchData<T>(store: Writable<GridStoreData>, url: string): Promise<void> {
    try {
        store.set({ state: 'loading', data: [] });

        const response = await fetch(url);
        const items: object[] = await response.json();
        const containers = items.map(objectsToContainers);

        store.set({ state: 'success', data: containers });
        store.set({ state: 'idling', data: containers });
    }
    catch (error) {
        store.set({ state: 'error', data: error as Error });
    }
}

function objectsToContainers(obj: { [index: string]:any }): { [index: string]:Containers } {

    let acc: { [index: string]:Containers } = {};

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