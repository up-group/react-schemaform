/// <reference types="react" />
import * as React from "react";
export interface ComponentRegisteryEntry {
    key: string;
    ComponentClass: React.ComponentClass<any>;
    type: string;
    format: string;
    array: boolean;
}
export default class ComponentRegistery {
    private static _instance;
    private static Component;
    constructor();
    static getInstance(): ComponentRegistery;
    static Register(key: string, type: string, format: string, Component: React.ComponentClass<any>, array?: boolean): void;
    static GetComponentByKey(ComponentKey: string): ComponentRegisteryEntry;
    private static GetComponentByType(type);
    private static GetComponentByFormat(format);
    static GetComponentBySchema(schema: JsonSchema): ComponentRegisteryEntry;
    static GetComponentInstanceByKey(key: string, onError: (hasError: boolean) => void, onChange: (arg) => void, isRequired: boolean, schema: JsonSchema): React.ComponentElement<any, React.Component<any, React.ComponentState>>;
    static GetComponentInstance(onError: (hasError: boolean) => void, onChange: (arg) => void, isRequired: boolean, schema: JsonSchema): React.ComponentElement<any, React.Component<any, React.ComponentState>>;
}
