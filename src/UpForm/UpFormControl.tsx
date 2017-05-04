import * as React from "react";
import ControlErrorCentral from "../ControlError/ControlErrorCentral";
import TypeNullControl from "../ControlError/TypeNullControl";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";


export interface baseProp<baseType> {
    schema: JsonSchema;
    isRequired: boolean;
    onChange: (arg: baseType, hasError: boolean) => void;
}

export interface baseState<baseType> {
    value?: baseType;
}

export abstract class UpFormControl<baseType> extends React.Component<baseProp<baseType>, baseState<baseType>> {


    inputElement: HTMLInputElement;
    _ControlErrorCentral: ControlErrorCentral;


    constructor(props?, context?) {
        super(props, context);
        this.state = {
            value: null
        };
        this._ControlErrorCentral = new ControlErrorCentral();
        this._ControlErrorCentral.addControl(new TypeNullControl(this.props.isRequired, this.isNullable, this.props.schema.default, this));
    }


    abstract renderField(): JSX.Element;


    public checkFormError() {
        //var errorCheck = this._ControlErrorCentral.isValidValue(this.state.value);
        //if (errorCheck.hasError == true) {
        //    this.props.onError(true)
        //    //if (this.InputBaseControl != null) {
        //    //    this.InputBaseControl.setState({ error: errorCheck.errorMessage });
        //    //}
        //} else {
        //    this.props.onError(false)
        //}
    }

    public handleChangeEventGlobal = (cleandata, event?, error?) => {
        this.setState({ value: cleandata }, () => {
            //if (eror === false) {
            //    this.checkFormError()

            //} else {
            //    this.props.onError(eror);
            //}
            this.props.onChange(this.state.value,error);
        });
    }


    private valueChange = (value: baseType) => {
    }

    isEmptyOrNull(value) {
        if (value === null) {
            return true;
        }
        if (value === "") {
            return true;
        }
        if (value === undefined) {
            return true;
        }
        return false;
    }

    get isNullable() {
        return JsonSchemaHelper.isNullable(this.props.schema);
    }


    render() {
        return this.renderField()
    }

}





