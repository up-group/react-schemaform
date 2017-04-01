import * as React from "react";
import * as ReactDOM from "react-dom";
import UpDisplayDate from "./UpDisplayDate";
import UpSchemaDisplayArray from "./UpSchemaDisplayArray";

export default class UpSchemaDisplaySelector extends React.Component<{
    schema: JsonSchema;
    data: any;
}, {}> {
    UpSchemaDisplayArrayRef: UpSchemaDisplayArray;    constructor(p, c) {        super(p, c);    }    render() {

        var type = function (t) {
            if (typeof (t) === "string") {
                return t;
            } else if (t.indexOf("null") != -1) {
                return t[0];
            }
        } (this.props.schema.type);


        switch (this.props.schema.format) {
            case "multilineText":
                return <span style={{ "whiteSpace": "pre" }}>{this.props.data}</span>
            case "imageUrl":
                return <img src={this.props.data} alt="test" ></img>
            case "uri":
                return <a target="_top" href={this.props.data}>{this.props.schema.description}</a>
            case "phone":
                if (this.props.data == null || this.props.data.length < 10) {
                    return <span >{this.props.data}</span>;
                }

                var phone = this.props.data.replace(/[^0-9|+]/g, "");
                var phoneSplit = phone[0] !== "+" ? phone.match(/.{1,2}/g) : phone.match(/(\+33.)|.{1,2}/g);
                var cleanPhone = phoneSplit.join(" ");
                return <span >{cleanPhone}</span>

            case "date":
                return <UpDisplayDate date={this.props.data} format={this.props.schema.format} />
            case "date-time":
                return <UpDisplayDate date={this.props.data} format={this.props.schema.format} />
            case "time":
                if (this.props.data != null && this.props.data.length == 5) {
                    return <span>{this.props.data}</span>
                }
                return <UpDisplayDate date={this.props.data} format={this.props.schema.format} />
            case "entityKey":                break;
            case "enum":                return <span>{this.props.schema.enumDescriptions[this.props.schema.enum.indexOf(this.props.data)]}</span>
        }

        switch (type) {
            case "object":
                return <UpObject schema={this.props.schema} data={this.props.data}/>
            //return <span>Type object: {JSON.stringify(this.props.data) } </span>
            case "string":
                return <span>{this.props.data}</span>
            case "number":
                return <span>{this.props.data}</span>
            case "integer":
                return <span>{this.props.data}</span>;
            case "boolean":
                return <span>{this.props.data == null ? "" : this.props.data == true ? "Oui" : "Non"}</span>;
            case "array":
                return <UpSchemaDisplayArray  ref={(arg) => { this.UpSchemaDisplayArrayRef = arg; } } /*exporterBtn={this.props.exporterBtn}*//* autoExport={this.props.autoExport}*/ data={this.props.data} schema={this.props.schema} />
        }        return <span/>
    }
}

class UpObject extends React.Component<{
    schema: JsonSchema;
    data: any;
}, {}> {
    constructor(p, c) {        super(p, c);    }    render() {

        var elements = [];
        var properties = [];
        var propertiesName = [];
        for (var index in this.props.schema.properties) {
            if (this.props.schema.properties.hasOwnProperty(index)) {
                var schema = this.props.schema.properties[index];
                elements.push(
                    <div key={index} className={"col-md-6"}>
                        <div className={"col-md-6"}>
                            <strong >{ schema.title }: </strong>
                        </div>
                        <div  className={"col-md-6"}>
                            <UpSchemaDisplaySelector data={this.props.data[index]} schema={schema}/>                        </div>
                    </div>
                )
            }
        }

        return <div className="panel panel-default">
            <div className="panel-heading">
                {this.props.schema.title}
            </div>
            <div className="panel-body">
                {elements}

            </div>
        </div>
    }
}

