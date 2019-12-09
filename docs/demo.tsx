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

import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";

import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { JsonSchemaHelper } from "../src";

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
      schema: {},
      hasError: false,
      showError: false,
      dataS: {}
    };
  }

  removeUnSupportedFeatures(argumentsSchema: JsonSchema) {
    for (const key in argumentsSchema.definitions) {
        if (argumentsSchema.definitions.hasOwnProperty(key)) {
            const element = argumentsSchema.definitions[key];
            if (element.format === "date-time")
                element.format = null
            this.removeUnSupportedFeatures(element)
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

componentDidMount(){
  fetch("http://localhost:5000/api/v2/subscriptiontheme/metadatas/create")
  .then(response => {
      if (!response.ok) {
          throw new Error(response.statusText)
      }
      return response.json();
  })
  .then(metadata => {
      if (metadata == null) {
          return;
      }
      var argumentsSchema = JsonSchemaHelper.parseSchema(metadata.argumentsSchema);
      this.removeUnSupportedFeatures(argumentsSchema)
      this.setState({
        schema : argumentsSchema
      })
  })
}
  render() {
    return (
      <UpThemeProvider theme={UpDefaultTheme}>
        <>
          <UpSchemaForm
            initValue={{ size: this.state.nb }}
            showError={this.state.showError}
            schema={this.state.schema}
            onFormChange={this.onFormPayload}
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
