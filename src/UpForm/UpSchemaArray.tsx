import * as React from "react";

import ComponentRegistery from "./ComponentRegistery";

import UpSchemaFormComponentSelector from "./UpSchemaFormComponentSelector";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";
import UpSchemaObject from "./UpSchemaObject";
import ErrorMemory from "./ErrorMemory";

export interface UpSchemaArrayProps {
  schema: JsonSchema;
  onChange: (arg: any, hasError: boolean) => void;
  isRequired: boolean;
  node: string;
  showError;
  initData: any;
}

export interface UpSchemaArrayState {
  items: item[];
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
        this.props.initData
      );
    }

    var items = this.state.items.map((value, index, array) => {
      var type = JsonSchemaHelper.getBaseType(schema);
      var element = null;
      switch (type) {
        case "object":
          element = (
            <UpSchemaObject
              initData={null}
              showError={this.props.showError}
              withHR={index !== 0}
              isRequired={this.props.isRequired}
              SchemaArg={schema}
              node={""}
              onFormChange={value.onChange}
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
            value.onChange,
            this.props.isRequired,
            schema,
            this.props.showError,
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
    items.push(new item(this.onItemChange));
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
    this.props.onChange(data, error);
  };
}

export class item {
  value = null;
  errorMemory = new ErrorMemory();
  error = false;
  constructor(public onItemChange) {}

  onChange = (arg, hasError: boolean, t?: string) => {
    if (t !== undefined) {
      if (this.value === null) {
        this.value = {};
      }
      this.errorMemory.cleanErrorOn(t);
      this.value[t.split(".")[1]] = arg;

      if (this.errorMemory.hasError === false) {
        this.onItemChange();
      }
    } else {
      this.error = hasError;
      this.value = arg;
      this.onItemChange();
    }
  };
}
