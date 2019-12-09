import * as React from "react";

import ComponentRegistery from "./ComponentRegistery";

import UpSchemaFormComponentSelector from "./UpSchemaFormComponentSelector";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";
import UpSchemaObject from "./UpSchemaObject";
import ErrorMemory from "./ErrorMemory";

import { eventFactory } from "@up-group/react-controls";

export interface UpSchemaArrayProps {
  schema: JsonSchema;
  onChange: (e: React.ChangeEvent<any>, value: any, hasError: boolean) => void;
  isRequired: boolean;
  node: string;
  showError;
  value: any;
  ignoredProperties: string[];
}

export interface UpSchemaArrayState {
  items: Item[];
}

export default class UpSchemaArray extends React.Component<
  UpSchemaArrayProps,
  UpSchemaArrayState
  > {
  constructor(p, c) {
    super(p, c);
    this.state = { items: [] };
  }
  render() {
    var schema: JsonSchema = this.props.schema.items as JsonSchema;

    var comp = ComponentRegistery.GetComponentBySchema(schema);

    if (comp != null && comp.array === true) {
      return ComponentRegistery.GetComponentInstanceByKey(
        comp.key,
        this.props.onChange,
        this.props.isRequired,
        this.props.schema,
        this.props.showError,
        this.props.value
      );
    }

    var items = this.state.items.map((item, index, array) => {
      var type = JsonSchemaHelper.getBaseType(schema);
      var element = null;
      switch (type) {
        case "object":
          element = (
            <UpSchemaObject
              value={null}
              showError={this.props.showError}
              withHR={index !== 0}
              isRequired={this.props.isRequired}
              schema={schema}
              node={""}
              onChange={item.onChange}
              ignoredProperties={this.props.ignoredProperties}
            />
          );
          break;
        //case "array":
        //    element = <UpSchemaArray
        //        node={""}
        //        onError={null}
        //        isRequired={this.props.isRequired}
        //        schema= { schema}
        //        onChange={value.oc} />
        //    break;
        default:
          element = ComponentRegistery.GetComponentInstance(
            item.onChange,
            this.props.isRequired,
            schema,
            this.props.showError,
            null,
            null
          );
          break;
      }

      return <div key={index}>{element}</div>;
    });

    return (
      <div
        style={{
          borderRadius: "4px",
          padding: "5px",
          border: "1px solid #f4f4f4"
        }}
      >
        {items}
        <br />
        <span className="btn-group">
          <button className="btn btn-default" onClick={this.AddElement}>
            <span className="glyphicon glyphicon-plus" />
          </button>
          <button
            className="btn btn-default"
            disabled={this.state.items.length <= 0}
            onClick={this.RemoveElement}
          >
            <span className="glyphicon glyphicon-minus" />
          </button>
        </span>
      </div>
    );
  }

  componentDidMount() {
    this.AddElement();
  }

  AddElement = () => {
    var items = this.state.items;
    items.push(new Item(this.onItemChange));
    this.setState({ items: items });
  };
  RemoveElement = () => {
    var items = this.state.items;
    var item = items.pop();
    this.setState({ items: items }, this.onItemChange);
  };

  onItemChange = () => {
    var data = [];
    var error = false;
    for (var i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].error === true) {
        error = true;
      }
      data.push(this.state.items[i].value);
    }
    this.props.onChange(eventFactory("", data), data, error);
  };
}

export class Item {
  value = null;
  errorMemory = new ErrorMemory();
  error = false;
  constructor(public onItemChange) { }

  onChange = (
    e: React.ChangeEvent<any>,
    value,
    hasError: boolean,
    t?: string
  ) => {
    if (t !== undefined) {
      if (this.value === null) {
        this.value = {};
      }
      this.errorMemory.cleanErrorOn(t);
      this.value[t.split(".")[1]] = value;

      if (this.errorMemory.hasError === false) {
        this.onItemChange();
      }
    } else {
      this.error = hasError;
      this.value = value;
      this.onItemChange();
    }
  };
}
