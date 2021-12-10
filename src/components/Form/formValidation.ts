import type {Entity} from "../../scripts/dataContainers";

export interface ValidationEventArgs {
    key: string,
    message: string;
}

export interface IFormValidator {
    validate: (entity: Entity) => Map<string, string>
}

class FormValidator implements IFormValidator {
    validate(entity: Entity): Map<string, string> {
        return Object
            .keys(entity)
            .map(key => {
                const message = entity[key].validate?.() ?? '';
                return { key, message };
            })
            .reduce((acc, next) => acc.set(next.key, next.message), new Map<string, string>());
    }
}

export default FormValidator;