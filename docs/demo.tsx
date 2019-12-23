import * as React from "react";
import * as update from "react-addons-update";
import * as ReactDOM from "react-dom";
import UpSchemaForm from "../src/UpSchemaForm";
import {
  UpNumber,
  UpThemeProvider,
  UpThemeInterface,
  UpDefaultTheme
} from "@up-group/react-controls";

import axios, { AxiosResponse } from "axios";

import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";

import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { JsonSchemaHelper } from "../src";
import { style } from "typestyle";
import { PropertyViewModel } from "../src/UpForm/UpSchemaFormComponentSelector";

//ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-07.json"));

interface DemoState {
  result: string;
  schema: JsonSchema;
  hasError: boolean;
  showError: boolean;
  nb?: number;
  dataS: any;
}

class Demo extends React.Component<{}, DemoState> {
  constructor(p, c) {
    super(p, c);
    this.state = {
      nb: 55,
      result: "",
      schema: {
        definitions: {
          PaginationProperties: {
            type: ["object", "null"],
            default: null,
            properties: {
              page_number: {
                type: "integer",
                default: 0
              },
              page_size: {
                type: "integer",
                default: 0
              },
              sort_property_name: {
                type: ["string", "null"],
                default: null
              },
              sort_order: {
                type: ["integer", "null"],
                default: null
              }
            }
          }
        },
        type: "object",
        properties: {
          pagination_properties: {
            $ref: "#/definitions/PaginationProperties"
          },
          establishment_id: {
            title: "Establishment",
            type: ["string", "null"],
            default: null
          },
          start_date: {
            title: "Date de début",
            type: ["string", "null"],
            default: null,
            format: "date"
          },
          end_date: {
            title: "Date de fin",
            type: ["string", "null"],
            default: null,
            format: "date"
          },
          settlement_reference: {
            title: "Numéro de télécollecte",
            type: ["string", "null"],
            default: null
          },
          transaction_status: {
            title: "Status",
            enumNames: [null, "Authorized", "Validated", "Canceled", "Denied"],
            enumDescriptions: [
              null,
              "Authorized",
              "Validated",
              "Canceled",
              "Denied"
            ],
            type: ["integer", "null"],
            default: null,
            format: "enum",
            enum: [null, 1, 2, 3, 4]
          }
        }
      },
      hasError: false,
      showError: false,
      dataS: {}
    };
  }

  removeUnSupportedFeatures(argumentsSchema: JsonSchema) {
    for (const key in argumentsSchema.definitions) {
      if (argumentsSchema.definitions.hasOwnProperty(key)) {
        const element = argumentsSchema.definitions[key];
        if (element.format === "date-time") element.format = null;
        this.removeUnSupportedFeatures(element);
      }
    }
    for (const key in argumentsSchema.properties) {
      if (argumentsSchema.properties.hasOwnProperty(key)) {
        const element = argumentsSchema.properties[key];
        if (element.type === undefined) {
          delete argumentsSchema.properties[key];
        } else {
          if (element.format === "date-time") element.format = null;
          argumentsSchema.properties[key].title = key;
          this.removeUnSupportedFeatures(element);
        }
      }
    }
  }

  render() {
    var viewModels: PropertyViewModel[] = [
      {
        colspan: 16,
        order: 3,
        name: "establishment_id"
      },
      {
        colspan: 10,
        order: 4,
        name: "settlement_reference"
      },
      {
        colspan: 4,
        order: 1,
        name: "start_date"
      },
      {
        colspan: 4,
        order: 2,
        name: "end_date"
      },
      {
        colspan: 24,
        name: "transaction_status",
        order: 5
      }
    ];

    return (
      <UpThemeProvider theme={UpDefaultTheme}>
        <>
          <UpSchemaForm
            initValue={{ transaction_status: {type : 2} }}
            showError={this.state.showError}
            schema={this.state.schema}
            onFormChange={this.onFormPayload}
            wrapperClassName={style({
              padding: "10px"
            })}
            viewModels={viewModels}
            translate={text => {
              if (text === "Authorized") return "Authorisée";
              return text;
            }}
          />
          <JSONInput
            id="a_unique_id"
            placeholder={this.state.schema}
            locale={locale}
            theme="light_mitsuketa_tribute"
            colors={{
              string: "#DAA520" // overrides theme colors with whatever color value you want
            }}
            onChange={this.onSchemaChange}
          />
        </>
      </UpThemeProvider>
    );
  }

  onEditorChange = e => {};

  onSchemaChange = value => {
    this.setState({ result: "", schema: value.jsObject });
  };

  onFormPayload = (e, hasError: boolean) => {
    this.setState({ dataS: e });
  };
}

ReactDOM.render(<Demo />, document.getElementById("root"));
