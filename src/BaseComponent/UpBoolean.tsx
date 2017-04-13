import * as React from "react";
import {UpFormControl} from "../UpForm/UpFormControl"

import { UpSwitch } from "@up-group/up-react-controls";

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
        return <UpSwitch isNullable={this.isNullable} onChange={this.handleChangeEventGlobal} default={true} ></UpSwitch>        
    }
    
    isEmpty() {
        return false;
    }

    handleChangeJsEvent(event : boolean) {
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
