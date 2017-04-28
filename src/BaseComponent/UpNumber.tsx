import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl"
import TypeNumberControl from "../ControlError/TypeNumberControl"
import { UpNumber } from "@up-group/react-controls";

interface baseprop {
    value: any,
    onChange: (data: any) => void,
    onError: (error: any) => void
}

export default class UpNumberComp extends UpFormControl<number> {

    constructor(p, c) {
        super(p, c);
    }

    renderField() {
        return <UpNumber isNullable={this.isNullable} onChange={this.handleChangeEventGlobal} max={this.props.schema.maximum} min={this.props.schema.minimum} />
    }

}
