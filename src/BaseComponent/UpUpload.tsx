import * as React from "react";
import {UpFormControl} from "../UpForm/UpFormControl"
import TypeNumberControl from "../ControlError/TypeNumberControl"
import { UpFile } from "@up-group/react-controls";

export default class UpUpload extends UpFormControl<number[]> {

    constructor(p, c) {
        super(p, c);
    }

    setInput(data) {
    }

    _componentDidMount() {
    }

    renderField() {
        /* onError={this.handlErrorEventGlobal}*/
        return <UpFile
            //ref={(i) => { this.InputBaseControl = i; }}
            hasError={this.state.hasError} onChange={this.handleChangeEventGlobal} fileExtension={this.props.schema.fileExtension} />
    }

    handleChangeJsEvent(event: any) {
        return event;
    }

    isEmpty(value) {
        return value === null || value === [] || value === "";
    }

}
