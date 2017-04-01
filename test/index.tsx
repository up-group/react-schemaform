import * as React from "react";
import * as ReactDOM from "react-dom";
import UpSchemaForm from "./node_modules/upschemaform/src/UpSchemaForm";


var onFormEror = (data) => {
    console.log("err", data);
}

var onFormPayload = (data) => {
    console.log("payload", data);

}


var schema = {

    "type": "object",
    "properties": {
        "geo": { "type": "string" },

        "age": { "type": "number" }


    }


};


var a = <UpSchemaForm schema={schema} onFormEror={onFormEror} onFormPayload={onFormPayload}></UpSchemaForm>

var t = (<h1>Hello, world! {a} </h1>);


ReactDOM.render(t, document.getElementById('root'));


