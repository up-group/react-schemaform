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
        type: "object",
        properties: {
          Id: {
            type: "string",
            default: "00000000-0000-0000-0000-000000000000"
          },
          Name: { title: "Nom", type: ["string", "null"], default: null },
          Date: {
            title: "Date de création",
            type: "string",
            default: "0001-01-01T00:00:00",
            format: "date-time"
          },
          IsEnabled: { title: "Actif", type: "boolean", default: false }
        }
      },
      hasError: false,
      showError: false,
      dataS: {}
    };
  }

  render() {
    return (
      <UpThemeProvider theme={UpDefaultTheme}>
        <>
          <JSONInput
            id="a_unique_id"
            placeholder={this.state.schema}
            locale={locale}
            theme="light_mitsuketa_tribute"
            colors={{
              string: "#DAA520" // overrides theme colors with whatever color value you want
            }}
            height="550px"
            onChange={this.onSchemaChange}
          />
          <UpSchemaForm
            initValue={{ size: this.state.nb }}
            showError={this.state.showError}
            schema={this.state.schema}
            onFormChange={this.onFormPayload}
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
