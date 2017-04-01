"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var UpSchemaForm_1 = require("./node_modules/upschemaform/src/UpSchemaForm");
var onFormEror = function (data) {
    console.log("err", data);
};
var onFormPayload = function (data) {
    console.log("payload", data);
};
var schema = {
    "type": "object",
    "properties": {
        "geo": { "type": "string" },
        "age": { "type": "number" }
    }
};
var a = React.createElement(UpSchemaForm_1.default, { schema: schema, onFormEror: onFormEror, onFormPayload: onFormPayload });
var t = (React.createElement("h1", null,
    "Hello, world! ",
    a,
    " "));
ReactDOM.render(t, document.getElementById('root'));
//# sourceMappingURL=index.js.map