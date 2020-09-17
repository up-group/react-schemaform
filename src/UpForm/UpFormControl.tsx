import * as React from "react";
import ControlErrorCentral from "../ControlError/ControlErrorCentral";
import TypeNullControl from "../ControlError/TypeNullControl";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";
import { JsonSchema } from "../interfaces/JsonSchema";

export interface BaseProps<BaseType> {
  schema: JsonSchema;
  name: string;
  isRequired: boolean;
  onChange: (e, arg: BaseType, error: string) => void;
  showError: boolean;
  value: BaseType;
  translate : (text: string) => any,
  onSearchButtonClick?: (text: string) => any;
  floatingLabel?: string
  // isReadOnly?:(property: string) => boolean;
  isReadOnly?: boolean;
  additionalProps?: { [key: string]: any }
}

export interface BaseState<BaseType> {
  value?: BaseType;
  internalData? : any
}

export abstract class UpFormControl<BaseType> extends React.Component<
  BaseProps<BaseType>,
  BaseState<BaseType>
> {
  inputElement: HTMLInputElement;
  controlErrorCentral: ControlErrorCentral;

  constructor(props?, context?) {
    super(props, context);
    this.state = {
      value: this.props.value != undefined ? this.props.value : this.default()
    };
    this.controlErrorCentral = new ControlErrorCentral();
    this.controlErrorCentral.addControl(
      new TypeNullControl(
        this.props.isRequired,
        this.isNullable,
        this.props.schema.default,
        this
      )
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value != nextProps.value) {
      this.setState({
        value: nextProps.value !== undefined ? nextProps.value : this.default()
      });
    }
  }
  
  abstract renderField(): JSX.Element;

  public handleChangeEventGlobal = (event, cleandata, error?) => {
    this.setState({ value: cleandata }, () => {
      this.props.onChange(event, this.state.value, error);
    });
  };

  private valueChange = (value: BaseType) => {};

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

  default = (fallback?: BaseType): BaseType => {
    return this.props.schema.default !== undefined
      ? this.props.schema.default
      : fallback;
  };

  render() {
    return this.renderField();
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

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
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
    } else if (
      objB.hasOwnProperty(keysA[i]) &&
      typeof objA[keysA[i]] === "object"
    ) {
      if (shallowEqual(objA[keysA[i]], objB[keysA[i]]) == false) {
        return false;
      }
    } else if (
      !objB.hasOwnProperty(keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}
