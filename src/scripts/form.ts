import type {Containers} from "./containers";

export type FormLayoutDirection = 'vertical' | 'horizontal' | undefined

export interface FormLayoutNode {
    direction?: FormLayoutDirection,
    children: ChildFormLayoutNode[]
}

export interface FormElementNode {
    key: string
}

export type ChildFormLayoutNode = FormLayoutNode | FormElementNode;

export interface FormElementArgs<T extends Containers> {
    id: string,
    disabled: boolean,
    label: string,
    container: T
}