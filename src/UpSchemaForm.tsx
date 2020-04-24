
/// <reference path="./interfaces/UpReactComponent.ts"/>

import * as React from "react";
import UpSchemaFormComponentSelector, {
  PropertyViewModel
} from "./UpForm/UpSchemaFormComponentSelector";
import ErrorMemory from "./UpForm/ErrorMemory";
import JsonSchemaHelper from "./helper/JsonSchemaHelper";
import { JsonSchema } from "./interfaces/JsonSchema";
import { UpPanel } from "@up-group-ui/react-controls";
import * as _ from "lodash";
import * as classnames from "classnames";
import {style} from "typestyle";
import { UpFormContextProvider } from './UpForm/UpFormContext';

type ShouldApplyUpdateRulePolicy = (trackedFieldValue: any) => any;

interface UpdateRule {
  trackedField: string;
  targetField: string;
  policyName: string
}

export interface UpSchemaFormProps {
  initValue?: any;
  value?: any;
  schema: string | JsonSchema;
  onFormChange: (data: any, hasError: boolean) => void;
  showError: boolean;
  ignoredProperties?: string[];
  wrapperClassName?: string;
  viewModels?: PropertyViewModel[];
  translate?: (text: string) => any;
  updateRulePolicies?: ShouldApplyUpdateRulePolicy[];
  updateRules?: UpdateRule[];
  onSearchButtonClick?: (text: string) => any;
  withFloatingLabel?: boolean,
  columnNumber?: number,
  rowSpacing?:number,
  columnSpacing?:number,
}

export default class UpSchemaForm extends React.Component<
  UpSchemaFormProps,
  {data: any}
  > {
  static defaultProps = {
    showError: true,
    initValue: {}
  };

  private errorMemory = new ErrorMemory();
  constructor(p, c) {
    super(p, c);
    if (this.props.initValue != null) {
      this.state = {data: this.props.initValue};
    } else {
      this.state = {data: this.props.value || {}};
    }
  }

  componentWillReceiveProps(newProps: UpSchemaFormProps){
    if(this.props.value != newProps.value){
      const newState = { ..._.cloneDeep(newProps.value) };
      this.setState({data: newState}, () => {this.forceUpdate()});
    }
  }

  private getSchema(): JsonSchema {
    if (this.props.schema == null) {
      return null;
    } else if (typeof this.props.schema === "string") {
      return JsonSchemaHelper.parseSchema(this.props.schema as string);
    } else {
      return JsonSchemaHelper.flat(
        this.props.schema,
        this.props.schema.definitions,
        {}
      );
    }
  }
  render() {

    let schema: JsonSchema = this.getSchema();
    if (schema == null) return <span />;
    if (schema == null || schema.type == null) {
      return (
        <div className="panel panel-default">
          <div className="panel-heading" />
          <div className="panel-body" />
          <div className="panel-footer">{this.props.children}</div>
        </div>
      );
    }

    const value = _.cloneDeep(this.state.data);
    let content = (
      <div className={this.props.wrapperClassName} style={{ display : 'flex' , width : '100%', 
        flexDirection : 'column'}}>
        <UpSchemaFormComponentSelector
          value={value}
          isRequired={false}
          schema={schema}
          node={""}
          onChange={this.onChange}
          showError={this.props.showError}
          ignoredProperties={this.props.ignoredProperties}
          viewModels={this.props.viewModels}
          translate={this.props.translate}
          onSearchButtonClick={this.props.onSearchButtonClick}
        />
        {this.props.children}
      </div>
    );

    if (schema.title)
      return (
        <UpPanel type={'primary'} title={schema.title} className={classnames(this.props.wrapperClassName, style({
          $nest : {
            "& .up-select-wrapper" : {
              marginTop : '14px' /** TEMP FIX ;  */
            }
          }
        }))}>
          {content}
        </UpPanel>
      );

    return (
      <UpFormContextProvider
        value={{
          withFloatingLabel: this.props.withFloatingLabel,
          columnNumber: this.props.columnNumber,
          rowSpacing: this.props.rowSpacing,
          columnSpacing: this.props.columnSpacing,
        }}
      >
        <div
          className={classnames(
            this.props.wrapperClassName,
            style({
              width: "100%",
            })
          )}
        >
          {content}
        </div>
      </UpFormContextProvider>
    );
  }

  onChange = (
    e: React.ChangeEvent<any>,
    newValue: any,
    hasError: boolean,
    node: string
  ) => {
    this.errorMemory.errorOn(node, hasError);

    let nodeArray = node.split(".");
    nodeArray.shift();

    this.addToQueue(this.state.data, nodeArray, newValue, node);
  };

  updateState(node: string) {
    let schema: JsonSchema = this.getSchema();
    if (schema && schema.properties["start_date"] && schema.properties["end_date"] && schema.properties["start_date"].format == "date" && schema.properties["end_date"].format == "date") {
      if (this.state.data["start_date"]) {
        schema.properties["end_date"].minimum = this.state.data["start_date"].format()
      }
      if (this.state.data["end_date"]) {
        schema.properties["start_date"].maximum = this.state.data["end_date"].format()
      }
    }

    if (this.props.updateRules && this.props.updateRules.length > 0) {
      let policies = this.props.updateRules
        .filter(rule => node.substring(1) === rule.trackedField)
        .map(rule => {
          let policy = this.props.updateRulePolicies.filter(p => p.name === rule.policyName);
          return { rule, policy: policy.length > 0 ? policy[0] : null };
        })
        .filter(policy => policy.policy !== null)
        ;      
      if (policies.length > 0) {
        let changes = {};
        for (const policy of policies) {
          let newValue = policy.policy(_.get(this.state.data, policy.rule.trackedField));
          _.set(changes, policy.rule.targetField, newValue);
        }
        this.setState({data: {...this.state.data, ...changes }}, () => this.props.onFormChange(_.cloneDeep(this.state.data), this.errorMemory.hasError))
        return;
      }
    }

    this.props.onFormChange(_.cloneDeep(this.state.data), this.errorMemory.hasError);
  }

  private inQueue = false;
  private assingDataOrder: { obj: any; nodes: any; value: any, node: string }[] = [];

  private assignValue(obj, nodes, value) {
    let data = obj != null ? _.cloneDeep(obj) : {};
    let prop = nodes.shift();
    if (nodes.length === 0) {
      data[prop] = value;
      return data;
    } else if (data.hasOwnProperty(prop) && typeof data[prop] === "object") {
      data[prop] = this.assignValue(data[prop], nodes, value);
      return data;
    } else if (data.hasOwnProperty(prop) === false) {
      data[prop] = {};
      data[prop] = this.assignValue(data[prop], nodes, value);
      return data;
    }
  }

  addToQueue = (obj, nodes, value, node) => {
    this.assingDataOrder.push({ obj, nodes, value, node });
    if (this.inQueue === false) {
      this.checkQueue();
    }
  };

  private checkQueue = () => {
    let a = this.assingDataOrder[0];
    this.inQueue = true;
    this.setState({data: this.assignValue(a.obj, a.nodes, a.value)}, () => {
      this.assingDataOrder.shift();
      if (this.assingDataOrder.length == 0) {
        this.updateState(a.node);
        this.inQueue = false;
      } else {
        this.assingDataOrder[0].obj = this.state.data;
        this.checkQueue();
      }
    });
  };
}

function is(x, y) {
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}
