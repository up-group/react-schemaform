
import * as React from "react";
import * as ReactDOM from "react-dom";
import UpSchemaForm from "../src/UpSchemaForm";

var onFormEror = (data) => {
    console.log("err", data);
}

var onFormPayload = (data) => {
    console.log("payload", data);

}


var schema: JsonSchema = {

    "type": "object",
    "properties": {
        "a": { "title": "str", "type": "string" },
        "b": { "title": "nb", "type": "number" },
        "c": { "title": "dateggg", "type": "string", "format": "date" },
        "d": { "title": "boll", "type": ["boolean","null"] },
    }


};


var a = <UpSchemaForm schema={schema} onFormEror={onFormEror} onFormPayload={onFormPayload}></UpSchemaForm>


ReactDOM.render(a, document.getElementById('root'));


