import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";

import { UpSwitch } from "@up-group/react-controls";

export default class UpBoolean extends UpFormControl<Boolean>{
    constructor(p, c) {
        super(p, c);
    }

    setInput(data) {
    }

    _componentDidMount() {
        this.setState({
            value: this.props.schema.default
        });

    }

    renderField() {
        return <UpSwitch /*ref={(i) => { this.InputBaseControl = i; }}*/ isNullable={this.isNullable} onChange={this.handleChangeEventGlobal} default={true} />
    }

    isEmpty() {
        return false;
    }

    handleChangeJsEvent(event: boolean) {
        return event;
    }

    handleChangeData(args: boolean) {
        return {
            hasError: false,
            errorMessage: null,
            correctValue: args
        };
    }

}
