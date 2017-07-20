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

export default class EntityField<Type> extends UpFormControl<Type> {
    constructor(p, c) {
        super(p, c);
    }

    renderField() {
        return <UpSelect
            showError={this.props.showError}
            default={null}
            //isNullable={this.isNullable}
            isRequired={this.props.isRequired}
            //getFullData={false}
            multiple={this.isArray}
            placeholder="Recherche"
            allowClear={!this.props.isRequired}
            onChange={this.onChange}
            dataSource={this.schema.entitySource}
        />
        //    onError={this.props.onError}
    }

    //isEmpty(value) {
    //    if (this.isArray && value != null && value.length === 0) {
    //        return true;
    //    }
    //    return value === null || value === undefined || value === "" || value === "00000000-0000-0000-0000-000000000000";
    //}


    private onChange = (cleandata, event?, error?) => {
        this.handleChangeEventGlobal(cleandata != null && cleandata[this.schema.entitySource.id] != null ? cleandata[this.schema.entitySource.id] : cleandata, event, error)
    }


    private get schema(): JsonSchema {
        return this.props.schema.items || this.props.schema

    }

    private get isArray() {
        return (this.props.schema.type as TypeOfSchema[]).indexOf("array") !== -1;
    }


}
