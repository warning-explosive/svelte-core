import {setContext, getContext} from "svelte";

export const setContainer = (dependencyContainer: DependencyContainer): void => {
    return setContext('container', dependencyContainer);
}

export const getContainer = ():IDependencyContainer => {
    return getContext('container');
}

export interface IDependencyContainer {
    resolve: <T extends object>(name: string) => T,
    resolveCollection: <T extends object>(name: string) => T[]
}

class DependencyContainer implements IDependencyContainer {
    #dependencies: Map<string, object>;

    constructor() {
        this.#dependencies = new Map<string, object>();
    }

    register<T extends object>(name: string, service: T): DependencyContainer {
        if (!arguments.length) {
            return this;
        }

        this.#dependencies.set(name, service);
        return this;
    }

    registerCollection<T extends object>(name: string, services: T[]): DependencyContainer {
        if (!arguments.length) {
            return this;
        }

        this.#dependencies.set(name, services);
        return this;
    }

    resolve<T extends object>(name: string): T {
        if (!this.#dependencies.has(name)) {
            throw new Error(`Could not resolve ${name} service`);
        }

        const service = this.#dependencies.get(name);

        return service as T;
    }

    resolveCollection<T extends object>(name: string): T[] {
        if (!this.#dependencies.has(name)) {
            throw new Error(`Could not resolve ${name} service collection`);
        }

        const services = this.#dependencies.get(name);

        return services as T[];
    }
}

export default DependencyContainer;