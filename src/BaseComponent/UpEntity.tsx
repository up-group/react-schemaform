import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl"

import { UpSelect } from "@up-group/react-controls";

interface UpEntityExtendProp {
    getFullData: boolean;
    multiple: boolean;
    placeholder?: string;
    allowClear?: boolean;
    minimumInputLength?: number;

    dataSource: {
        id: string,
        text: string,
        query: string,
        queryParameterName: string
    }
}

export default class UpEntity<Type> extends UpFormControl<Type> {
    constructor(p, c) {
        super(p, c);
    }


    renderField() {
        return <UpSelect
            // ref={(i) => { this.InputBaseControl = i; }}
            default={null}
            isNullable={this.isNullable}
            isRequired={this.props.isRequired}
            getFullData={false}
            multiple={this.isArray}
            placeholder="Recherche"
            allowClear={!this.props.isRequired}
            onChange={this.handleChangeEventGlobal}
            dataSource={this.schema.entitySource}
            onError={() => { }}
        />
        //    onError={this.props.onError}
    }

    isEmpty(value) {
        if (this.isArray && value != null && value.length === 0) {
            return true;
        }
        return value === null || value === undefined || value === "" || value === "00000000-0000-0000-0000-000000000000";
    }

    private get schema(): JsonSchema {
        return this.props.schema.items || this.props.schema

    }

    private get isArray() {
        return (this.props.schema.type as TypeOfSchema[]).indexOf("array") !== -1;
    }


}
