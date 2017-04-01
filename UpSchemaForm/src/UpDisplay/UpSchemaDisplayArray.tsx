import * as React from "react";
import * as ReactDOM from "react-dom";
import UpSchemaDisplaySelector from "./UpSchemaDisplaySelector"
//import * as exporterTable from "exporterTable";
//exporterTable;

export default class UpSchemaDisplayArray extends React.Component<{
    //autoExport: boolean;
    schema: JsonSchema;
    data: any;
}, {}>{
    constructor(p, c) {        super(p, c);    }    private btnExport = null;


    componentDidUpdate = () => {
        $(this.btnExport).remove();
        //this.btnExport = $("table").exporterTable({ header: true, position: 2, className: "btn btn-default", linkName: "Exporter" })[0];
    }

    componentDidMount = () => {
        $(this.btnExport).remove();
       // this.btnExport = $("table").exporterTable({ header: true, position: 2, className: "btn btn-default", linkName: "Exporter" })[0];
    }

    exportArrayToCsv() {
        this.btnExport.click();
    }

    render() {
        var header = [];
        for (var key in (this.props.schema.items as JsonSchema).properties) {
            if (!(this.props.schema.items as JsonSchema).properties.hasOwnProperty(key)) continue;

            header.push(<th key={key}>{(this.props.schema.items as JsonSchema).properties[key].title || key}</th>);

        }

        var rows = [];
        if (this.props.data != null) {
            for (var i = 0; i < this.props.data.length; i++) {
                rows.push(<ObjectRow  key={i} schema={(this.props.schema.items as JsonSchema).properties} data={this.props.data[i]} />);
            }
        }

        return <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    {header}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>

    }

}



class ObjectRow extends React.Component<{ schema: JsonSchema, data: any }, {}> {
    render() {
        var cols = [];
        for (var key in this.props.data) {
            if (!this.props.data.hasOwnProperty(key)) continue;
            cols.push(<td key={key}><UpSchemaDisplaySelector schema={this.props.schema[key]} data={this.props.data[key]}  /></td>);
        }
        return <tr>{cols}</tr>
    }
}



