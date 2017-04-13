import * as React from "react";
import ControlErrorCentral from "../ControlError/ControlErrorCentral";
import TypeNullControl from "../ControlError/TypeNullControl";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";



export interface baseProp<baseType> {
    schema: JsonSchema;
    isRequired: boolean;
    onChange: (arg: baseType) => void;
    onError: () => void;
}

export interface baseState<baseType> {
    value?: baseType;
    hasError?: boolean;
    errorMessage?: string;
}

export abstract class UpFormControl<baseType> extends React.Component<baseProp<baseType>, baseState<baseType>> {


    inputElement: HTMLInputElement;
    _ControlErrorCentral: ControlErrorCentral;


    constructor(props?, context?) {
        super(props, context);
        this.state = {
            hasError: false,
            value: null
        };
        this.handleChangeJsEventGlobal = this.handleChangeJsEventGlobal.bind(this);

        this._ControlErrorCentral = new ControlErrorCentral();
        this._ControlErrorCentral.addControl(new TypeNullControl(this.props.isRequired, this.isNullable, this.props.schema.default, this));
    }

    abstract handleChangeJsEvent(args: any): baseType;
    abstract isEmpty(value: baseType): boolean;
    abstract setInput(args: baseType);
    abstract _componentDidMount(): void;
    abstract renderField(): JSX.Element;


    public handleChangeJsEventGlobal(event) {
        var cleandata = this.handleChangeJsEvent(event);
        this.handleChangeEventGlobal(cleandata);
    }

    public handleChangeEventGlobal = (cleandata) => {
        var result = this._ControlErrorCentral.isValidValue(cleandata);
        if (result.hasError) {
            this.setSpecificError(result.errorMessage);
        } else {
            this.unSetSpecifiError();
            this.valueChange(result.correctValue);
            this.setInput(result.correctValue);
        }
    }


    private valueChange = (value: baseType) => {
        this.setState({ value: value },
            () => {
                this.props.onChange(value);
            });
    }


    setSpecificError = (errorMesssage: string) => {

        this.setState({
            hasError: true,
            errorMessage: errorMesssage
        });
        this.props.onError();
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
        this._componentDidMount();
        if (this.props.schema.default !== undefined) {
            this.handleChangeEventGlobal(this.props.schema.default);
            this.setInput(this.props.schema.default);
        } else {
            this.handleChangeEventGlobal(null);
            this.setInput(null);
        }

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





