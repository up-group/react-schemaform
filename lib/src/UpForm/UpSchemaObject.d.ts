/// <reference types="react" />
import * as React from "react";
export interface UpSchemaObjectProps {
    withHR: boolean;
    SchemaArg: JsonSchema;
    node: string;
    onFormChange: (newValue: any, node: string) => void;
    onFormError: (node: string, hasError: boolean) => void;
    isRequired: boolean;
}
export default class UpSchemaObject extends React.Component<UpSchemaObjectProps, {}> {
    constructor(p: any, c: any);
    render(): JSX.Element;
    isRequired(prop: any): boolean;
}
