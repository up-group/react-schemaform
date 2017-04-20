import { UpFormControl } from "../UpForm/UpFormControl"


export default class TypeNullControl implements ErrorControl<any> {

    private _isNullable: boolean;
    private _isRequierd: boolean;
    public defaultValue: any;
    private _control: UpFormControl<any>;

    constructor(isRequierd: boolean, isNullable: boolean, defaultValue: any, control: UpFormControl<any>) {
        this._isNullable = isNullable;
        this._isRequierd = isRequierd;
        this.defaultValue = defaultValue;
        this._control = control;
    }


    isValidValue(value: any): errorControlType<any> {
        if (this._isRequierd && this.isNullOrWhiteSpace(value) === true) {
            return { hasError: true, errorMessage: "Doit avoir une valeur" }
        }

        //if (this._isNullable == false) {
        //    return { hasError: true, errorMessage: "Doit avoir une valeur" }
        //}

        return { hasError: false }
    }

    private isNullOrWhiteSpace(value) {
        var emptyValue = [undefined, null, ""];

        if (value === undefined || value === null || value === "") {
            return true;
        }

        if (value.length === 0) {
            return true;
        }


        return false;
    }

}