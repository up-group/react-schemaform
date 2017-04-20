import * as React from "react";
import {UpFormControl} from "../UpForm/UpFormControl"
import TypeNumberControl from "../ControlError/TypeNumberControl"
import { UpFile } from "@up-group/react-controls";

export default class UpUpload extends UpFormControl<number[]> {

    constructor(p, c) {
        super(p, c);
    }

    renderField() {
        /* onError={this.handlErrorEventGlobal}*/
        return <UpFile
            //ref={(i) => { this.InputBaseControl = i; }}
            hasError={undefined} onChange={this.handleChangeEventGlobal} fileExtension={this.props.schema.fileExtension} />
    }

}
