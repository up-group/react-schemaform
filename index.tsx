import * as React from "react";
import * as ReactDOM from "react-dom";
import UpSchemaForm from "./src/UpSchemaForm"

import {UpSwitch} from "up-react-control"


var schema : JsonSchema= {
    "title":"test",
    "type": "object",
    "properties":{
        "a":{"type":"number"},
        "b":{"type":"string"}
    }
}

var onFormEror = (e)=>{
    console.log("onFormEror",e);
}
var onFormPayload = (e)=>{
    console.log("onFormPayload",e);
}

var a = <UpSchemaForm schema={schema} onFormEror={onFormEror} onFormPayload={onFormPayload}></UpSchemaForm>
 
var b = <UpSwitch isNuallble={true} onChange={(aa) => { console.log(aa); }}></UpSwitch>

ReactDOM.render(a, document.getElementById('root'));


