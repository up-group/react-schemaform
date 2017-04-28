/// <reference types="react" />
import * as React from "react";
export interface UpSchemaFormComponentSelectorProps {
    schema: JsonSchema;
    node: string;
    onFormChange: (newValue: any, node: string) => void;
    onFormError: (node: string, hasError: boolean) => void;
    isRequired: boolean;
}
export default class UpSchemaFormComponentSelector extends React.Component<UpSchemaFormComponentSelectorProps, {}> {
    constructor(p: any, c: any);
    Component: {
        [key: string]: React.ComponentClass<any>;
    };
    Register(key: string, Component: React.ComponentClass<any>): void;
    GetComponent(ComponentKey: string): React.ComponentClass<any>;
    private findGetParameter(parameterName);
    render(): any;
    private onElementChange;
    private onElementError;
}
