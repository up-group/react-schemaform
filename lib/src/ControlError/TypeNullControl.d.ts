import { UpFormControl } from "../UpForm/UpFormControl";
export default class TypeNullControl implements ErrorControl<any> {
    private _isNullable;
    private _isRequierd;
    defaultValue: any;
    private _control;
    constructor(isRequierd: boolean, isNullable: boolean, defaultValue: any, control: UpFormControl<any>);
    isValidValue(value: any): errorControlType<any>;
    private isNullOrWhiteSpace(value);
}
