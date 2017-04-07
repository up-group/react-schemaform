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

        var s = {
            "title": "test",
            "type": "object",
            "properties": {
                "a": { "type": "number" },
                "b": { "type": "string" }
            }
        };
        this.state = { result: "", schema: s }
    }

    render() {
       
        var onFormEror = (e) => {
            console.log("onFormEror", e);
        }

        return<div>
            <textarea  className="form-control" cols={100} rows={10} onChange={this.onSchemaChange}></textarea>
            <hr/>
            <UpSchemaForm schema={this.state.schema} onFormEror={onFormEror} onFormPayload={this.onFormPayload}></UpSchemaForm>
            <hr />
            {this.state.result}
            </div>
                

    }

    onSchemaChange = (e)=>{
                this.setState({schema: JSON.parse(e.target.value)});
    }

    onFormPayload = (e) => {
        this.setState({result: JSON.stringify(e)});
    }


}




ReactDOM.render(<Demo />, document.getElementById('root'));


