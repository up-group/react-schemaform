import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpSelect } from "@up-group-ui/react-controls";

import { JsonSchema, InternalTypeOfSchema} from "../interfaces/JsonSchema";

import * as _ from 'lodash' ;

interface UpEnumExtendProp {
  _enum: Number[];
  enumDescriptions: String[];
  multiple: boolean;
}
type EnumData = { id: any; text: string };

export default class EnumField extends UpFormControl<number | string |  number[] | string[]> {
  constructor(p, c) {
    super(p, c);
  }

  convertValuesFromStringToInt  = (values : string[]) : number[] => {
    return values.map(this.convertValueFromStringToInt);
  }

  convertValueFromStringToInt  = (value : string) : number =>  {
    const indexOfEnumValue = this.props.schema.enumNames.indexOf(value) ;
    return this.props.schema.enum[indexOfEnumValue] ;
  }

  selectedOptions = (options: EnumData[]) : EnumData | EnumData[] => {
    if(this.state.value != null) {
      
      let value = this.state.value;
      if(typeof value  == "string") {
        value = this.convertValueFromStringToInt(value) ;
      } else if(_.isArray(value) && value.length > 0 && typeof value[0] == "string") {
        value = this.convertValuesFromStringToInt(value as string[]) ;
      }
      
      if(this.isArray) {
        return options.filter(option => (value as number[]).some(id => id == option.id)) 
      } else {
        const optionFiltered = options.find( o => o.id == value as number) ;
        return !_.isEmpty(optionFiltered) ? optionFiltered : null
      }
    }
    return null
  }

  renderField() {
    var options = [];

    for (var i = 0; i < this.schema.enum.length; i++) {
      if (this.schema.enum[i] !== null) {
        options.push({
          id: this.schema.enum[i],
          text: this.props.translate ? this.props.translate(this.schema.enumDescriptions[i]) : this.schema.enumDescriptions[i]
        });
      }
    }

    return (
      <UpSelect
        name={this.props.name}
        value={this.selectedOptions(options)}
        showError={this.props.showError}
        default={this.schema.default}
        returnType="id"
        isRequired={this.props.isRequired}
        minimumInputLength={0}
        disabled={this.props.isReadOnly && this.props.isReadOnly(this.props.name)}
        placeholder="Recherche"
        multiple={this.isArray}
        allowClear={!this.props.isRequired}
        floatingLabel={this.props.floatingLabel}
        onChange={this.handleChangeEventGlobal}
        data={options}
      />
    );
  }

  private get schema(): JsonSchema {
    return (this.props.schema.items as JsonSchema) || this.props.schema;
  }

  private get isArray() {
    return (
      (this.props.schema.type as InternalTypeOfSchema[]).indexOf("array") !== -1
    );
  }
}
