import * as React from "react";
import {UpFormControl} from "../UpForm/UpFormControl"
import TypeNumberControl from "../ControlError/TypeNumberControl"
//import UpFile from "../externalReactComponent/UpFile"
import UpFile from "../../node_modules/up-react-control/Controls/UpFile"

export default class UpUpload extends UpFormControl<number[]> {
    constructor(p, c) {        super(p, c);
    }    setInput(data) {    }    _componentDidMount() {
    }    renderField() {
        return <UpFile onError={this.setSpecificError} hasError={this.state.hasError} onChange={this.handleChangeJsEventGlobal} fileExtension={this.props.schema.fileExtension}/>
    }

    handleChangeJsEvent(event: any) {
        return event;
    }

    isEmpty(value) {
        return value === null || value === [] || value === "";
    }


}
