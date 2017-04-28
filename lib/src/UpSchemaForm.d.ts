/// <reference path="../../src/interfaces/JsonSchema.d.ts" />
/// <reference path="../../src/interfaces/UpReactComponent.d.ts" />
/// <reference types="react" />
import * as React from "react";
import ErrorMemory from "./UpForm/ErrorMemory";
export interface UpSchemaFormProps {
    schema: JsonSchema;
    onFormEror: (data: boolean) => void;
    onFormPayload: (data: any) => void;
}
export default class UpSchemaForm extends React.Component<UpSchemaFormProps, {}> {
    errorMemory: ErrorMemory;
    constructor(p: any, c: any);
    componentDidMount(): void;
    render(): JSX.Element;
    onFormError: (node: string, hasError: boolean) => void;
    onFormChange: (newValue: any, node: string) => void;
    updateState(): void;
    private newObject(nodes, value);
}
