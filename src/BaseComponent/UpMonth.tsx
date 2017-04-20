import * as React from "react";
import {UpFormControl} from "../UpForm/UpFormControl"
export default class UpMonth extends UpFormControl<number> {
    constructor(p, c) {        super(p, c);

    }    setInput(data) {        if (this.inputElement) {            this.inputElement.value = data;        }    }    renderField() {
        return <select className="form-control" /*onChange={this.handleChangeJsEventGlobal}*/>
            <option value='-1'>--Select Month--</option>
            <option value='1'>Janvier</option>
            <option value='2'>Février</option>
            <option value='3'>Mars</option>
            <option value='4'>Avril</option>
            <option value='5'>Mai</option>
            <option value='6'>Juin</option>
            <option value='7'>Juillet</option>
            <option value='8'>Août</option>
            <option value='9'>Septembre</option>
            <option value='10'>Octobre</option>
            <option value='11'>Novembre</option>
            <option value='12'>Décembre</option>
        </select>
    }
    isEmpty(value) {
        return value === null || value === undefined || value === "";
    }

}
