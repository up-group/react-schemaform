import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";

import { UpSwitch, UpRadio } from "@up-group/react-controls";

export default class BooleanField extends UpFormControl<Boolean>{
    constructor(p, c) {
        super(p, c);
    }

    renderField() {
        if (this.isNullable === false) {
            return <UpRadio
                name={this.randomSting}
                displayMode="horizontal"
                options={[{ text: "Oui", value: "true" }, { text: "Non", value: "false" }]}
                onChange={this.handleChangeData}
                defaultValue={this.defaultValue()}

            />
        } else {
            return <UpRadio
                name={this.randomSting}
                displayMode="horizontal"
                options={[{ text: "Oui", value: "true" }, { text: "Non", value: "false" }, { text: "Indifférent", value: "null" }]}
                onChange={this.handleChangeData}
                defaultValue={this.defaultValue()}
            />
        }

        //return <UpSwitch value={this.props.initData} isNullable={this.isNullable} onChange={this.handleChangeEventGlobal} default={true} />
    }

    defaultValue = () => {
        var dafaultValue: any = this.props.initData != undefined ? this.props.initData : this.props.schema.default;
        if (this.isNullable === false) {
            if (dafaultValue === true) {
                return "true";
            } else {
                return "false";
            }
        } else {
            if (dafaultValue === false) {
                return "false";
            } else if (dafaultValue === true) {
                return "true";
            } else {
                return "null";
            }
        }
    }


    get randomSting() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    }


    handleChangeData = (args: any) => {
        var data;
        switch (args) {
            case "null":
                this.handleChangeEventGlobal(null, null, false);
                break;
            case "true":
                this.handleChangeEventGlobal(true, null, false);
                break;
            case "false":
                this.handleChangeEventGlobal(false, null, false);
                break;
            default:
                this.handleChangeEventGlobal(null, null, false);
        }

    }

}


