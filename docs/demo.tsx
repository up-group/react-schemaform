import * as React from "react";
import * as ReactDOM from "react-dom";
import UpSchemaForm from "../src/UpSchemaForm"

interface DemoState {
    result: string;
    schema: JsonSchema;
}

export class Demo extends React.Component<{}, DemoState> {


    constructor(p, c) {
        super(p, c);
        this.state = { result: "", schema: {} }
    }

    render() {


        var schemas = [

            {
                data: {
                    "title": "test",
                    "type": "object",
                    "properties": {
                        "number": { "type": "number" },
                        "integer": { "type": "integer" },
                        "boolean": { "type": "boolean" },
                        "string": { "type": "string" },
                    }
                }
                ,
                id: "base"
            }
            ,
            {
                data: {
                    "title": "date",
                    "type": "object",
                    "properties": {
                        "date": { "type": "string", "format": "date" },
                        "time": { "type": "string", "format": "time" },
                        "datetime": { "type": "string", "format": "datetime" },
                    }
                }
                ,
                id: "DateTime"
            }
        ];


        var onFormEror = (e) => {
            console.log("onFormEror", e);
        }

        return <div>

            <select className="form-control" defaultValue="" onChange={this.selectChange} required>

                {
                    schemas.map((schema) => {
                        return <option key={schema.id} value={JSON.stringify(schema.data)}>{schema.id}</option>;
                    })
                }

            </select>

            <textarea value={JSON.stringify(this.state.schema)} className="form-control" cols={100} rows={10} onChange={this.onSchemaChange}></textarea>
            <hr />
            <UpSchemaForm schema={this.state.schema} onFormEror={onFormEror} onFormPayload={this.onFormPayload}></UpSchemaForm>
            <hr />
            {this.state.result}
        </div>


    }

    onSchemaChange = (e) => {
        this.setState({ schema: JSON.parse(e.target.value) });
    }

    onFormPayload = (e) => {
        this.setState({ result: JSON.stringify(e) });
    }


    selectChange = (e) => {
        this.setState({ schema: JSON.parse(e.target.value) });
    }

}




ReactDOM.render(<Demo />, document.getElementById('root'));


