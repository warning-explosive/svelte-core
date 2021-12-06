import type {DataContainers, Entity} from "./dataContainers";

export type FormLayoutDirection = 'vertical' | 'horizontal' | undefined

export interface FormLayoutNode {
    direction: FormLayoutDirection,
    children: ChildFormLayoutNode[]
}

export interface FormElementNode {
    key: string,
    disabled: boolean
}

export type ChildFormLayoutNode = FormLayoutNode | FormElementNode;

export interface FormElementArgs<T extends DataContainers> {
    key: string,
    disabled: boolean,
    label: string,
    container: T
}

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