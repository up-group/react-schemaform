import * as React from "react";
import * as ReactDOM from "react-dom";
import UpSchemaForm from "../src/UpSchemaForm"
//import {UpDraft} from "@up-group/react-controls"

interface DemoState {
    result: string;
    schema: JsonSchema;
    hasError: boolean;
}

export class Demo extends React.Component<{}, DemoState> {
    constructor(p, c) {
        super(p, c);
        this.state = { result: "", schema: {}, hasError: false }
    }

    render() {
        var schemas: { id: string, data: JsonSchema }[] = [
            {
                data: {
                    "title": "test",
                    "type": "object",
                    "properties": {
                        "number": { "type": "number" },
                        "integer": { "type": "integer" },
                        "boolean": { "type": "boolean" },
                        "string": { "type": "string" }
                    }
                },
                id: "base"
            },
            {
                data: {
                    "title": "date",
                    "type": "object",
                    "properties": {
                        "date": { "type": "string", "format": "date" },
                        "time": { "type": "string", "format": "time" },
                        "datetime": { "type": "string", "format": "date-time" }
                    }
                },
                id: "DateTime"
            },
            {
                data: {
                    "title": "Required",
                    "type": "object",
                    "properties": {
                        "number": { "type": "number" }
                    },
                    "required": ["number"]
                },
                id: "required"
            },
            {
                data: {
                    "title": "MAX / MIN",
                    "type": "object",
                    "properties": {
                        "size": {
                            "type": "number",
                            "minimum": 5.0,
                            "maximum": 10.5
                        }
                    },
                },
                id: "MAX / MIN"
            },
            {
                data: {
                    "title": "enum",
                    "type": "object",
                    "properties": {
                        "size": {
                            "enumNames": ["choix1", "choix2", "choix3"],
                            "enumDescriptions": ["Premier choix", "Second choix", "Troisieme choix"],
                            "type": "integer",
                            "format": "enum",
                            "enum": [2, 4, 6]
                        }

                    },
                },
                id: "enum"
            },
            {
                data: {
                    "title": "upload",
                    "type": "object",
                    "properties": {
                        "file":
                        {
                            "fileExtension": ".csv",
                            "type": ["string", "null"],
                            "default": null,
                            "format": "upload"
                        }
                    },
                },
                id: "upload"
            },
            ,
            {
                data: {
                    "title": "everyone",
                    "type": "object",
                    "properties": {
                        "a": {
                            "title": "boolean", "type": "boolean"
                        },
                        "b": { "title": "integer", "type": "integer" },
                        "c": { "title": "number", "type": "number" },
                        "d": { "title": "string", "type": "string" },
                        "e": { "title": "date", "type": "string", "format": "date" },
                        "f": { "title": "date-time", "type": "string", "format": "date-time" },
                        "g": { "title": "time", "type": "string", "format": "time" },
                        "h": { "title": "month", "type": "string", "format": "month" },
                        "i": { "title": "upload", "type": "string", "format": "upload" },
                        "j": {
                            "title": "enum",
                            "enumNames": ["choix1", "choix2", "choix3"],
                            "enumDescriptions": ["Premier choix", "Second choix", "Troisieme choix"],
                            "type": "integer",
                            "format": "enum",
                            "enum": [2, 4, 6]
                        }

                    },
                },
                id: "everyone"
            }

        ];


        return <div>
            <select className="form-control" defaultValue="" onChange={this.selectChange} required>
                {
                    schemas.map((schema) => {
                        return <option key={schema.id} value={JSON.stringify(schema.data)}>{schema.id}</option>;
                    })
                }
            </select>

            <textarea value={JSON.stringify(this.state.schema)} className="form-control" cols={100} rows={3} onChange={this.onSchemaChange}></textarea>
            <hr />
            <UpSchemaForm schema={this.state.schema} onFormEror={this.onFormEror} onFormPayload={this.onFormPayload}></UpSchemaForm>
            <hr />
            <div style={{ color: this.state.hasError ? "red" : "green" }}>
                {this.state.result}
            </div>
        </div>
    }

    onFormEror = (e) => {
        this.setState({ hasError: e })
        console.log("onFormEror", e);
    }

    onEditorChange = (e) => {
        console.log(e);
    }

    onSchemaChange = (e) => {
        this.setState({ result: "", schema: JSON.parse(e.target.value) });
    }

    onFormPayload = (e) => {
        this.setState({ result: JSON.stringify(e) });
    }

    selectChange = (e) => {
        this.setState({ schema: JSON.parse(e.target.value) });
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'));
