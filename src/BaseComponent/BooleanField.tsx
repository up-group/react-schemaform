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
                name="modeAdresse"
                displayMode="horizontal"
                options={[{ text: "Oui", value: true }, { text: "Non", value: false }]}
                onChange={this.handleChangeData}
                defaultValue={false}
                
            />
        } else {
            return <UpRadio
                name="modeAdresse"
                displayMode="horizontal"
                options={[{ text: "Oui", value: true }, { text: "Non", value: false }, { text: "indifférent", value: "null" }]}
                onChange={this.handleChangeData}
                defaultValue={"null"}

            />
        }

        //return <UpSwitch value={this.props.initData} isNullable={this.isNullable} onChange={this.handleChangeEventGlobal} default={true} />
    }


    handleChangeData(args: any) {
        if (args === "null") {
            return null;
        }

        return {
            hasError: false,
            errorMessage: null,
            correctValue: args
        };
    }

}


