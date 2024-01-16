
/// <reference path="./interfaces/UpReactComponent.ts"/>

import * as React from "react";
import UpSchemaFormComponentSelector from "./UpForm/UpSchemaFormComponentSelector";
import ErrorMemory from "./UpForm/ErrorMemory";
import JsonSchemaHelper from "./helper/JsonSchemaHelper";
import { AdditionalProps, JsonSchema } from "./interfaces/JsonSchema";
import { UpPanel } from "@up-group-ui/react-controls";
import * as _ from "lodash";
import classnames from "classnames";
import {style} from "typestyle";
import { UpFormContextProvider } from './UpForm/UpFormContext';

type ShouldApplyUpdateRulePolicy = (trackedFieldValue: any) => any;

interface UpdateRule {
  trackedField: string;
  targetField: string;
  handler: ShouldApplyUpdateRulePolicy
}

export interface UpSchemaFormProps {
  initValue?: any;
  value?: any;
  schema: string | JsonSchema;
  onFormChange: (data: any, hasError: boolean) => void;
  showError: boolean;
  ignoredProperties?: string[];
  wrapperClassName?: string;
  translate?: (text: string) => any;
  updateRules?: UpdateRule[];
  onSearchButtonClick?: (text: string) => any;
  isReadOnly?: (property:string, data: unknown) => boolean;
  withFloatingLabel?: boolean;
  rowSpacing?: number;
  gutter?: number;
  rowMinHeight?: number;
  defaultColspan?: number;
  hideEmptyTitle?: boolean;
}

export default class UpSchemaForm extends React.Component<
  React.PropsWithChildren<UpSchemaFormProps>,
  {data: any}
  > {

  static defaultProps = {
    initValue: null,
    withFloatingLabel: true,
    rowSpacing: 5,
    gutter: 5,
    defaultColspan: 8,
    rowMinHeight: 70
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
      const newState = {...this.props.value, ..._.cloneDeep(newProps.value)};
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
      <div className={this.props.wrapperClassName} style={{ display : 'flex' , width : '100%', flexDirection : 'column'}}>
        <UpSchemaFormComponentSelector
          value={value}
          values={value}
          isRequired={false}
          schema={schema}
          node={""}
          hideEmptyTitle={this.props.hideEmptyTitle}
          onChange={this.onChange}
          showError={this.props.showError}
          ignoredProperties={this.props.ignoredProperties}
          translate={this.props.translate}
          onSearchButtonClick={this.props.onSearchButtonClick}
          isReadOnly = {this.props.isReadOnly ? (name) => this.props.isReadOnly(name, value): () =>false}
        />
        {this.props.children}
      </div>
    );

    if (schema.title)
      return (
        <UpFormContextProvider
            value={{
              withFloatingLabel: this.props.withFloatingLabel,
              rowSpacing: this.props.rowSpacing,
              gutter: this.props.gutter,
              defaultColspan: this.props.defaultColspan,
              rowMinHeight : this.props.rowMinHeight,
            }}
          >
          <UpPanel type={'primary'} title={schema.title} className={classnames(this.props.wrapperClassName, style({
            $nest : {
              "& .up-select-wrapper" : {
                marginTop : '14px' /** TEMP FIX ;  */
              }
            }
          }))}>
            {content}
          </UpPanel>
        </UpFormContextProvider>
      );

    return (
      <UpFormContextProvider
        value={{
          withFloatingLabel: this.props.withFloatingLabel,
          rowSpacing: this.props.rowSpacing,
          gutter: this.props.gutter,
          defaultColspan: this.props.defaultColspan,
          rowMinHeight: this.props.rowMinHeight
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

    const schema: JsonSchema = this.getSchema();
    const { properties : schemaProperties } = schema || {};
    const currentElement = schemaProperties[e.target.name];
    debugger;

     if (currentElement?.targetPropertyValueGeneration) {
      var generatedValue = currentElement.targetPropertyValueGeneration.calculateValue(newValue);
      this.addToQueue(this.state.data, nodeArray, newValue, node);
      this.addToQueue(this.state.data, [currentElement.targetPropertyValueGeneration.targetProperty], generatedValue, currentElement.targetPropertyValueGeneration.targetProperty);
     }
     else 
      this.addToQueue(this.state.data, nodeArray, newValue, node);
  };

  updateState(node: string) {
    const schema: JsonSchema = this.getSchema();
    const { properties : schemaProperties } = schema || {};
    
    //Update related date fields state.
    //The number of date fields that exist in the schema.
    const dateInputsLength = _.keys(schemaProperties).filter(property => schemaProperties[property].format == 'date').length;

    //Schema contains two related date fields : start_date && end_date.
    if(dateInputsLength == 2) {
      if (schemaProperties['start_date'] && schemaProperties['end_date'] && schemaProperties['start_date'].format == 'date' && schemaProperties['end_date'].format == 'date') {
        if (this.state.data.hasOwnProperty('start_date')) {
          schemaProperties['end_date'].minimum = this.state.data['start_date'] ? this.state.data['start_date'].format() : '';
        }
        if (this.state.data.hasOwnProperty('end_date')) {
          schemaProperties['start_date'].maximum = this.state.data['end_date'] ? this.state.data['end_date'].format() : '';
        }
      }
    }

    //Schema contains several related date fields.
    if(dateInputsLength > 2) {
      _.keys(schemaProperties).forEach( property => {
        if(schemaProperties[property] && schemaProperties[property].format == 'date') {
          let schemaProperty = schemaProperties[property] ;

          if (this.state.data.hasOwnProperty(property)) {
            
            const { caseOf, isRelatedTo : relatedDate } = schemaProperty.props as AdditionalProps || {};

            if(caseOf && relatedDate && schema.properties[relatedDate] && caseOf == 'start_date') {
              schemaProperties[relatedDate].minimum = this.state.data[property] ? this.state.data[property].format() : '';
            }

            if(caseOf && relatedDate && schema.properties[relatedDate] && caseOf == 'end_date') {
              schemaProperties[relatedDate].maximum = this.state.data[property] ? this.state.data[property].format() : '';
            }
          }
        }
      });
    }

    if (this.props.updateRules && this.props.updateRules.length > 0) {
      let policies = this.props.updateRules.filter(rule => node.substring(1) === rule.trackedField && rule.handler != null)
      if (policies.length > 0) {
        let changes = {};
        for (const policy of policies) {
          let newValue = policy.handler(_.get(this.state.data, policy.trackedField));
          _.set(changes, policy.targetField, newValue);
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
