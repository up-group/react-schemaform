"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var UpSchemaForm_1 = require("./src/UpSchemaForm");
var up_react_controls_1 = require("@up-group/up-react-controls");
var schema = {
    "title": "test",
    "type": "object",
    "properties": {
        "a": { "type": "number" },
        "b": { "type": "string" }
    }
};
var onFormEror = function (e) {
    console.log("onFormEror", e);
};
var onFormPayload = function (e) {
    console.log("onFormPayload", e);
};
var a = React.createElement(UpSchemaForm_1.default, { schema: schema, onFormEror: onFormEror, onFormPayload: onFormPayload });
var b = React.createElement(up_react_controls_1.UpSwitch, { isNuallble: true, onChange: function (aa) { console.log(aa); } });
ReactDOM.render(a, document.getElementById('root'));
//# sourceMappingURL=index.js.map