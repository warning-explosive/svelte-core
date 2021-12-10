import type {DataContainers} from "../../scripts/dataContainers";

export type FormLayoutDirection = 'vertical' | 'horizontal' | undefined

export interface FormLayoutNode {
    direction: FormLayoutDirection,
    children: ChildFormLayoutNode[]
}

export interface FormElementNode {
    key: string,
    disabled: boolean,
    focused?: boolean
}

export type ChildFormLayoutNode = FormLayoutNode | FormElementNode;

export interface FormElementArgs<T extends DataContainers> {
    key: string,
    disabled: boolean,
    focused?: boolean,
    label: string,
    container: T
}