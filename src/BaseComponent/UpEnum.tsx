import * as React from "react";
import {UpFormControl} from "../UpForm/UpFormControl";
import UpSelect2 from "../ReactComponent/UpSelect2";

interface UpEnumExtendProp {
    _enum: Number[];
    enumDescriptions: String[];
    multiple: boolean;
}
export default class UpEnum extends UpFormControl<number> {
    constructor(p, c) {        super(p, c);
    }    _componentDidMount() {
    }    setInput(data) {    }    renderField() {
        var options = [];
        for (var i = 0; i < this.schema.enum.length; i++) {
            if (this.schema.enum[i] == null) {
                options.push({ id: this.schema.enum[i], text: "null Value" });

            } else {
                options.push({ id: this.schema.enum[i], text: this.schema.enumDescriptions[i] });
            }
        }

      return <UpSelect2
            default= {this.schema.default}
            isNuallble={this.isNuallble}
            isRequired={this.props.isRequired}
            getFullData={false}
            minimumInputLength={0}
            placeholder="Recherche"
            multiple={this.isArray}
            allowClear={!this.props.isRequired}
            onError={this.props.onError}
            onChange={this.handleChangeJsEventGlobal}
            data ={options}
            />
                
    }

    private get schema() : JsonSchema {
        return this.props.schema.items || this.props.schema

    }

    private get isArray() {
        return this.props.schema.type.indexOf("array") !== -1;
    }

    handleChangeJsEvent(value: any) {
        return value;
       
    }

    isEmpty(value) {
        if (this.isArray && value != null && value.length === 0) {
            return true;
        }
        return value === null || value === undefined || value === "";
    }}
