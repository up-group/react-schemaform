import * as $ from "jquery";
import * as React from "react";
import {UpFormControl} from "../UpForm/UpFormControl"
import {TypeDateControl, dateFormat} from "../ControlError/TypeDateControl"
import UpDateTime from "../externalReactComponent/UpDateTime"

export default class UpDateTimeComp extends UpFormControl<Date> {
    inputElementGroup: HTMLDivElement;    constructor(p, c) {        super(p, c);
        this._ControlErrorCentral.addControl(new TypeDateControl(dateFormat.dateTime));
    }    setInput(data) {     //   $(this.inputElementGroup).data("DateTimePicker").date(data);    }
    _componentDidMount() {
        //$(this.inputElementGroup).datetimepicker({ locale: 'fr', format: "DD/MM/YYYY HH:mm" });
        //$(this.inputElementGroup).on("dp.change", this.handleChangeJsEventGlobal);
    }    renderField() {
        return <UpDateTime onChange={this.handleChangeEventGlobal} hasError={this.state.hasError} isNuallble={this.isNuallble}></UpDateTime>

        //return <div className='input-group datetime' ref={(input) => { this.inputElementGroup = input; } } >
        //    <input
        //        ref={(input) => { this.inputElement = input; } }
        //        style={this.state.hasError === true ? { borderColor: "red" } : null}
        //        type='text'
        //        className="form-control" />
        //    <span className="input-group-addon">
        //        <span className="glyphicon glyphicon-calendar"></span>
        //    </span>
        //</div>
    }


    handleChangeJsEvent(event: Date) {
        //if (typeof (event.date) === "object" && event.date && typeof (event.date.toDate) === "function") {
        //    return event.date.toDate();
        //}
        //return null;
        return event;
    }

    isEmpty(value) {
        return value === null || value === undefined || value === "";
    }
}