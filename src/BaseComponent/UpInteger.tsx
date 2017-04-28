import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl"
import TypeNumberControl from "../ControlError/TypeNumberControl"
import { UpInteger } from "@up-group/react-controls";

export default class UpIntegerComp extends UpFormControl<number> {
    constructor(p, c) {
        super(p, c);
    }

    renderField() {
        return <UpInteger isNullable={this.isNullable} onChange={this.handleChangeEventGlobal} max={this.props.schema.maximum} min={this.props.schema.minimum} />
    }

}
