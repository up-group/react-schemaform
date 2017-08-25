import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";

import { UpSwitch } from "@up-group/react-controls";

export default class BooleanField extends UpFormControl<Boolean>{
    constructor(p, c) {
        super(p, c);
    }

    renderField() {
        return <UpSwitch value={this.props.initData} isNullable={this.isNullable} onChange={this.handleChangeEventGlobal} default={true} />
    }


    handleChangeData(args: boolean) {
        return {
            hasError: false,
            errorMessage: null,
            correctValue: args
        };
    }

}


