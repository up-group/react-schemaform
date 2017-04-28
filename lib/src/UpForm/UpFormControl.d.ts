/// <reference types="react" />
import * as React from "react";
import ControlErrorCentral from "../ControlError/ControlErrorCentral";
export interface baseProp<baseType> {
    schema: JsonSchema;
    isRequired: boolean;
    onChange: (arg: baseType) => void;
    onError: (hasError: boolean) => void;
}
export interface baseState<baseType> {
    value?: baseType;
}
export declare abstract class UpFormControl<baseType> extends React.Component<baseProp<baseType>, baseState<baseType>> {
    inputElement: HTMLInputElement;
    _ControlErrorCentral: ControlErrorCentral;
    constructor(props?: any, context?: any);
    abstract renderField(): JSX.Element;
    checkFormError(): void;
    handleChangeEventGlobal: (cleandata: any, event?: any, eror?: any) => void;
    private valueChange;
    isEmptyOrNull(value: any): boolean;
    readonly isNullable: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
}
