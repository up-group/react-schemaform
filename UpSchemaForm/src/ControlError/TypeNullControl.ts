import {UpFormControl} from "../UpForm/UpFormControl"


export default class TypeNullControl implements ErrorControl<any> {

    private _isNuallble: boolean;
    private _isRequierd: boolean;
    public defaultValue: any;
    private _control: UpFormControl<any>;

    constructor(isRequierd: boolean, isNuallble: boolean, defaultValue: any, control: UpFormControl<any>) {        this._isNuallble = isNuallble;
        this._isRequierd = isRequierd;
        this.defaultValue = defaultValue;
        this._control = control;
    }
    isValidValue(value: any): errorControlType<any> {
        if (this._isRequierd && this._control.isEmpty(value)) {
            return { hasError: true, errorMessage: "Doit avoir une valeur" }
        }

        //if (this._isNuallble == false) {
        //    return { hasError: true, errorMessage: "Doit avoir une valeur" }
        //}

        return { hasError: false }
    }

}