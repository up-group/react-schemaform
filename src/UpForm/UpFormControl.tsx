import * as React from "react";
import ControlErrorCentral from "../ControlError/ControlErrorCentral";
import TypeNullControl from "../ControlError/TypeNullControl";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";


export interface baseProp<baseType> {
    schema: JsonSchema;
    isRequired: boolean;
    onChange: (arg: baseType, hasError: boolean) => void;
    showError: boolean;
    initData: any;
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
            value: this.props.initData != undefined ? this.props.initData : this.default()
        };
        this._ControlErrorCentral = new ControlErrorCentral();
        this._ControlErrorCentral.addControl(new TypeNullControl(this.props.isRequired, this.isNullable, this.props.schema.default, this));
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.value != nextProps.initData) {
            this.setState({ value: nextProps.initData != undefined ? nextProps.initData : this.default() });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (shallowEqual(this.state.value, nextState.value) === true) {
            return false;
        }      
        return true
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
            this.props.onChange(this.state.value, error);
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

    default = (fallback?: baseType): baseType => {
        return this.props.schema.default !== undefined ? this.props.schema.default : fallback;
    }

    render() {
        return this.renderField()
    }

}







function is(x, y) {
    if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        // Added the nonzero y check to make Flow happy, but it is redundant
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
    }
}

function shallowEqual(objA, objB) {
    if (is(objA, objB)) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (var i = 0; i < keysA.length; i++) {
        if (objA[keysA[i]] && objA[keysA[i]].constructor === Array) {
            for (var j = 0; j < objA[keysA[i]].lenght; j++) {
                if (shallowEqual(objA[keysA[i]][j], objA[keysB[i]][j]) === false) {
                    return false;
                }
            }
        } else if (objB.hasOwnProperty(keysA[i]) && typeof (objA[keysA[i]]) === "object") {
            if (shallowEqual(objA[keysA[i]], objB[keysA[i]]) == false) {
                return false;
            }
        } else if (!objB.hasOwnProperty(keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }

    return true;
};

