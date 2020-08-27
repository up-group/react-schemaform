import * as React from "react";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";
import { JsonSchema } from "../interfaces/JsonSchema";

import UpSchemaFormComponentSelector, {
    PropertyViewModel
} from "./UpSchemaFormComponentSelector";
import {
    UpSvgIcon,
    UpButton,
    UpPanel,
    UpBox,
    UpGrid,
    UpCol,
    UpRow,
    UpFormGroup
} from "@up-group-ui/react-controls";
import { style } from 'typestyle'
import { UpFormContextConsumer } from './UpFormContext';
import _ = require('lodash');

export interface UpSchemaObjectProps {
    value: any;
    withHR: boolean;
    schema: JsonSchema;
    node: string;
    onChange: (
        e: React.ChangeEvent<any>,
        newValue: any,
        hasError: boolean,
        node: string
    ) => void;
    isRequired: boolean;
    showError: boolean;
    ignoredProperties: string[];
    viewModels: PropertyViewModel[];
    translate: (text: string) => any;
    onSearchButtonClick?: (text: string) => any;
    isReadOnly?: (property: string) => boolean;
    defaultColspan?: number;
    hideEmptyTitle?: boolean
}

export interface UpSchemaObjectState {
    showAdvanced: boolean;
}

const getStyles = (props) => {
    const { columnSpacing, columnNumber, rowSpacing } = props;
    return style({
        display: "grid",
        gridTemplateColumns: `repeat(${columnNumber},${
            (100 - columnSpacing * columnNumber) / columnNumber
            }%)`,
        alignItems: "center",

        gridColumnGap: `${columnSpacing}%`,
        gridRowGap: `${rowSpacing}px`,
        $nest: {
            "& .grid-element": {
                alignSelf: "center",
            },
        },
    });
};

function compareItems<T extends { order: number }>(a: T, b: T): number {
    if (a.order > b.order) return 1;
    if (a.order === b.order) return 0;
    return -1;
}

export function manageColspan<
    T extends {
        colspan?: number;
        order: number;
        isSeparator?: boolean;
        group?: string;
    }
>(items: T[], defaultColspan: number, group?: string) {
    return items.sort(compareItems).reduce((rows, viewModel) => {
        let usedColSpan = 0;
        let colspan = 0;
        const spanLimit = 24;
        if (group) {
            viewModel.group = group === "undefined" ? "Autre" : group;
        }

        colspan = viewModel.colspan || defaultColspan;
        usedColSpan += colspan;
        let currentRow;
        if (rows.length === 0) {
            currentRow = [];
            rows.push(currentRow);
        } else {
            currentRow = rows[rows.length - 1];
        }
        if (viewModel.isSeparator) {
            usedColSpan = spanLimit;
        }

        if (usedColSpan > spanLimit) {
            currentRow = [];
            rows.push(currentRow);
            usedColSpan = colspan;
        }

        if (!viewModel.isSeparator) {
            currentRow.push(viewModel);
        }

        return rows;
    }, []);
}

export function groupByRow<
    T extends {
        colspan?: number;
        order: number;
        isSeparator?: boolean;
        group?: string;
    }
>(items: T[], defaultColspan: number): T[][] {
    const oneGroupAtLeast = items.find((item) => !_.isUndefined(item.group));

    if (!_.isUndefined(oneGroupAtLeast)) {
        const groupedByGroup = _.groupBy(items, "group");

        const managedGroup = _.forIn(groupedByGroup, (values, key) => {
            manageColspan(values, defaultColspan, key);
        });
        return _.values(managedGroup);
    } else {
        const rows = manageColspan(items, defaultColspan);
        return rows;
    }
}

export default class UpSchemaObject extends React.Component<
    UpSchemaObjectProps,
    UpSchemaObjectState
    > {
    constructor(p, c) {
        super(p, c);
        this.state = {
            showAdvanced: false
        };
    }

    private isIgnored(propertyName: string): boolean {
        return (
            this.props.ignoredProperties != null &&
            this.props.ignoredProperties.indexOf(propertyName) !== -1
        );
    }

    render() {
        let viewModels =
            (!_.isEmpty(this.props.viewModels)
                ? this.props.viewModels
                : this.props.schema["viewModels"]) || [];
        Object.keys(this.props.schema.properties).forEach(
            (key, index) =>
                (this.props.schema.properties[key]["order"] =
                    this.props.schema.properties[key]["order"] || index + 1)
        );
        let inferViewModels: {
            name: string;
            colspan: number;
            order: number;
            group: string;
        }[] = viewModels
            .filter(
                (a) =>
                    !this.isIgnored(a.name) &&
                    this.props.schema.properties[a.name] &&
                    !this.props.schema.properties[a.name].hide
            )
            .map((vm) => ({
                ...vm,
                order: this.props.schema.properties[vm.name]["order"],
                group: this.props.schema.properties[vm.name]["group"],
                colspan: vm.colspan || this.props.defaultColspan,
            }));
        Object.keys(this.props.schema.properties)
            .filter((a) =>
                !this.isIgnored(a) &&
                !this.props.schema.properties[a].hide &&
                (this.props.hideEmptyTitle
                    ? this.props.schema.properties[a].title
                    : true)
            )
            .forEach((a) => {
                if (!viewModels.some((pc) => pc.name === a)) {
                    inferViewModels.push({
                        colspan: this.props.defaultColspan,
                        name: a,
                        order: inferViewModels.length,
                        group: this.props.schema.properties[a]["group"],
                    });
                }
            });

        inferViewModels = inferViewModels.sort(compareItems);


        const rows = groupByRow(
            inferViewModels,
            this.props.defaultColspan
        );

        const groupedRow = rows.map(row => _.groupBy(row, 'group'))


        let unknownsGroupIndex = -1;
        groupedRow.forEach((element, index) => {
            const unknownGroupExist = element['Autre']
            if (unknownGroupExist) unknownsGroupIndex = index
        })

        if (unknownsGroupIndex !== -1) {
            const unknownGroup = groupedRow[unknownsGroupIndex]
            groupedRow.splice(unknownsGroupIndex, 1)
            groupedRow.push(unknownGroup)
        }

        let elements = {};
        let elementsAdvanced = [];

        for (let propertyName in this.props.schema.properties) {
            if (this.props.schema.properties.hasOwnProperty(propertyName)) {
                let property = this.props.schema.properties[propertyName];

                if (this.isIgnored(propertyName) || property.hide) continue;

                let value =
                    this.props.value == null ? null : this.props.value[propertyName];

                let element = (
                    <div
                        style={{
                            minHeight: 70,
                            padding: "0 10px",
                            display: property.hide === true ? "none" : "block"
                        }}
                    >
                        <UpSchemaFormComponentSelector
                            value={value}
                            values={this.props.value}
                            name={propertyName}
                            showError={this.props.showError}
                            isRequired={this.isRequired(propertyName)}
                            key={propertyName}
                            schema={property}
                            node={this.props.node + "." + propertyName}
                            onChange={this.props.onChange}
                            ignoredProperties={this.props.ignoredProperties}
                            viewModels={inferViewModels}
                            translate={this.props.translate}
                            onSearchButtonClick={this.props.onSearchButtonClick}
                            isReadOnly={this.props.isReadOnly}
                        />
                    </div>
                );

                if (property.advanced === true) {
                    elementsAdvanced.push(element);
                } else {
                    elements[propertyName] = element;
                }
            }
        }

        return (
            <UpFormContextConsumer>
                {({ gutter: columnSpacing, rowSpacing }) => (
                    <UpGrid gutter={columnSpacing}>
                        {groupedRow.map((group) => {
                            for (let element in group) {
                                const Rows = element !== "undefined" ? (
                                    <React.Fragment key={element}>
                                        <UpFormGroup title={element} >
                                            <SchemaRow
                                                title={this.props.schema.title == null || this.props.node === "" ? "" : this.props.schema.title}
                                                withHR={this.props.withHR}
                                                key={element}
                                                rowSpacing={rowSpacing}
                                                elements={group[element].map(element => ({
                                                    colspan: element.colspan,
                                                    name: element.name,
                                                    render: elements[element.name]
                                                }))} />
                                        </UpFormGroup>
                                    </React.Fragment>

                                ) : (
                                        <SchemaRow
                                            title={this.props.schema.title == null || this.props.node === "" ? "" : this.props.schema.title}
                                            withHR={this.props.withHR}
                                            key={element}
                                            rowSpacing={rowSpacing}
                                            elements={group[element].map(element => ({
                                                colspan: element.colspan,
                                                name: element.name,
                                                render: elements[element.name]
                                            }))} />
                                    );
                                return Rows
                            }
                        })}
                        {elementsAdvanced != null && elementsAdvanced.length != 0 ? (
                            <UpRow>
                                <UpRow gutter={2}>
                                    <UpCol span={24}>
                                        <div style={{ padding: "10px" }}>
                                            <UpButton
                                                iconPosition="right"
                                                actionType={
                                                    this.state.showAdvanced === true
                                                        ? "caret-up"
                                                        : "caret-down"
                                                }
                                                intent="default"
                                                onClick={() => {
                                                    this.setState({
                                                        showAdvanced: !this.state.showAdvanced,
                                                    });
                                                }}
                                            >
                                                + de critères
                      </UpButton>
                                        </div>
                                    </UpCol>
                                </UpRow>
                                <UpRow gutter={0}>
                                    <div
                                        style={{
                                            display:
                                                this.state.showAdvanced === true ? "block" : "none",
                                        }}
                                    >
                                        {elementsAdvanced}
                                    </div>
                                </UpRow>
                            </UpRow>
                        ) : null}
                    </UpGrid>
                )}
            </UpFormContextConsumer>
        );
    }

    private sizeSpan = (schema: JsonSchema) => {
        if (schema.hide === true) {
            return 0;
        }
        let type = JsonSchemaHelper.getBaseType(schema);
        if (type === "object" || type === "array") {
            return 24;
        }
        return 24;
    };

    isRequired(prop) {
        let required = false;

        if (this.props.schema.required != undefined) {
            required = this.props.schema.required.indexOf(prop) !== -1;
        }
        return required;
    }
}

interface SchemaRowProps {
    rowSpacing: number;
    withHR: boolean;
    title: string;
    elements: { colspan: number, name: string, render: React.ReactNode }[];
}

const SchemaRow: React.FunctionComponent<SchemaRowProps> = ({ rowSpacing, withHR, title, elements }) => {
    return <UpRow style={{ marginBottom: `${rowSpacing || 10}px` }}>
        {withHR ? <hr /> : null}
        {title == null ? (
            ""
        ) : (
                <h4>{title}</h4>
            )}
        {elements.map((element, index) => {
            return (
                <UpCol
                    key={index}
                    xs={24}
                    sm={element.colspan > 12 ? element.colspan : 12}
                    md={element.colspan}
                    lg={element.colspan}
                >
                    {element.render}
                </UpCol>
            );
        })}
    </UpRow>
}