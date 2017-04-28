/// <reference types="react" />
import * as React from "react";
import ErrorMemory from "./ErrorMemory";
export interface UpSchemaArrayProps {
    schema: JsonSchema;
    onChange: (arg: any) => void;
    onError: (hasError: boolean) => void;
    isRequired: boolean;
    node: string;
}
export interface UpSchemaArrayState {
    items: item[];
}
export default class UpSchemaArray extends React.Component<UpSchemaArrayProps, UpSchemaArrayState> {
    constructor(p: any, c: any);
    render(): JSX.Element;
    componentDidMount: () => void;
    AddElement: () => void;
    RemoveElement: () => void;
    onItemChange: () => void;
    onItemError: (hasError: boolean) => void;
}
export declare class item {
    onItemChange: any;
    onItemError: any;
    value: any;
    errorMemory: ErrorMemory;
    error: boolean;
    constructor(onItemChange: any, onItemError: any);
    onChange: (arg: any, t?: string) => void;
    onError: () => void;
}
