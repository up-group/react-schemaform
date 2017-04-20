import * as React from "react";
import ControlErrorCentral from "../ControlError/ControlErrorCentral";
import TypeNullControl from "../ControlError/TypeNullControl";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";
import { BaseControl } from "@up-group/react-controls";


export interface baseProp<baseType> {
    schema: JsonSchema;
    isRequired: boolean;
    onChange: (arg: baseType) => void;
    onError: (hasError: boolean) => void;
}

export interface baseState<baseType> {
    value?: baseType;
    hasError?: boolean;
    errorMessage?: string;
}

export abstract class UpFormControl<baseType> extends React.Component<baseProp<baseType>, baseState<baseType>> {

    InputBaseControl: BaseControl<any, any>;

    inputElement: HTMLInputElement;
    _ControlErrorCentral: ControlErrorCentral;


    constructor(props?, context?) {
        super(props, context);
        this.state = {
            hasError: false,
            value: null
        };
        this._ControlErrorCentral = new ControlErrorCentral();
        this._ControlErrorCentral.addControl(new TypeNullControl(this.props.isRequired, this.isNullable, this.props.schema.default, this));
    }


    abstract isEmpty(value: baseType): boolean;
    abstract setInput(args: baseType);
    abstract _componentDidMount(): void;
    abstract renderField(): JSX.Element;

   
    public checkFormError() {
        var errorCheck = this._ControlErrorCentral.isValidValue(this.state.value);
        if (errorCheck.hasError == true) {
            this.handlErrorEventGlobal(true);
            if (this.InputBaseControl != null) {
                this.InputBaseControl.setState({ error: errorCheck.errorMessage });
            }
        }
    }

    public handleChangeEventGlobal = (cleandata, event?, eror?) => {
        this.setState({ value: cleandata }, () => {
            if (eror === false ) {
                this.checkFormError()

            }
            this.props.onChange(this.state.value);
        });

        //this.valueChange(cleandata);
        //if (eror === false) {
        //}

    }

    public handlErrorEventGlobal = (hasError: boolean) => {
        this.props.onError(hasError);
        //if (this.InputBaseControl == null) {
        //    console.log(this)
        //} else {
        //    this.InputBaseControl.setState({ error: "patate" });
        //}
        //if (hasError) {
        //    this.setState({
        //        hasError: true,
        //        errorMessage: ""
        //    });
        //} else {
        //    this.unSetSpecifiError();
        //}
    }


    private valueChange = (value: baseType) => {
    }


    setSpecificError = (errorMesssage: string) => {

        this.setState({
            hasError: true,
            errorMessage: errorMesssage
        });
        this.props.onError(true);
    }

    private unSetSpecifiError = () => {
        if (this.state.hasError == true) {
            this.setState({
                hasError: false,
                errorMessage: null
            });
        }

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


    componentDidMount() {
        this.handleChangeEventGlobal(null);
        //this._componentDidMount();
        //if (this.props.schema.default !== undefined) {
        //    this.handleChangeEventGlobal(this.props.schema.default);
        //    this.setInput(this.props.schema.default);
        //} else {
        //    this.handleChangeEventGlobal(null);
        //    this.setInput(null);
        //}

    }
    render() {
        return <span>
            {this.renderField()}
            {
                (this.state.hasError && this.state.errorMessage != null) ?
                    <span className="text-danger">{this.state.errorMessage}</span>
                    : null
            }
        </span>
    }

}





