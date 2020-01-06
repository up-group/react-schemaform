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
  schema: any;
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
      schema:  {"definitions":{"PaginationProperties":{"type":["object","null"],"default":null,"properties":{"items_per_page":{"type":"integer","default":0},"request_page":{"type":"integer","default":0}}}},"type":"object","properties":{"pagination_properties":{"$ref":"#/definitions/PaginationProperties"},"search":{"title":"Recherche","type":["string","null"],"default":null},"data_type":{"title":"Type","enumNames":["Crt","Siret","EtablishmentName"],"enumDescriptions":["Crt","Siret","Raison social"],"type":"integer","default":0,"format":"enum","enum":[1,2,3]}}},
      hasError: false,
      showError: false,
      dataS: {}
    };
    this.state.schema.properties["search"]["format"] = "search"
    // this.state.schema.properties["establishment_id"]["entitySource"] = {
    //   "endPoint": "http://localhost:44319",
    //   "queryParameterName": "search",
    //   "text": "name",
    //   "query": "v1/establishements/searchestablishment",
    // };
  }

  render() {
    return (
      <UpThemeProvider theme={UpDefaultTheme}>
        <>
          <UpSchemaForm
            initValue={{ }}
            showError={this.state.showError}
            schema={this.state.schema}
            onFormChange={this.onFormPayload}
            wrapperClassName={style({
              padding: "10px"
            })}
            viewModels={[]}
            translate={text => {
              if (text === "Authorized") return "Authorisée";
              return text;
            }}
            updateRules={[
              {
                targetField : "data_type",
                trackedField : "search",
                policyName : "format"
              }
            ]}
            updateRulePolicies={[
              function format(value: any){ 
                return {type : parseInt(value)};
              }
            ]}
            onSearchButtonClick={value => console.log(value)}
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
    console.log(e)
   // this.setState({ dataS: e });
  };
}

ReactDOM.render(<Demo />, document.getElementById("root"));
