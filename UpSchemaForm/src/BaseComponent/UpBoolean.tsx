import * as React from "react";
import {UpFormControl} from "../UpForm/UpFormControl"

export default class UpBoolean extends UpFormControl<Boolean>{
    name = this.makeid();    constructor(p, c) {        super(p, c);
    }    setInput(data) {    }    _componentDidMount() {
        this.setState({
            value: this.props.schema.default
        });
    }    renderField() {
        if (this.isNuallble === true) {
         return <span className="btnBool">
             <span className={"btnFalse " + (this.state.value === false ? "selected Null" : "")} value={false.toString()} onClick={this.onBoolClick}>Non</span>
                <span className={"btnNull " + (this.state.value === null ? "selected Null" : "") } value={null} onClick={this.onBoolClick}>Null</span>
                <span className={"btnTrue " + (this.state.value === true ? "selected Null" : "")} value={true.toString()} onClick={this.onBoolClick}>Oui</span>
            </span>
        } else {
            return <span className="btnBool">

                <span className={" " + (this.state.value === false ? "btnFalse selected" : "btnFalse")} value={false.toString()} onClick={this.onBoolClick}>Non</span>
                <span className={" " + (this.state.value === true ? "btnTrue selected" : "btnTrue")} value={true.toString()} onClick={this.onBoolClick}>Oui</span>
            </span>
        }
    }
    onBoolClick = (a) => {        var data = a.target.getAttribute("value");        switch (data) {
            case "true":
                this.handleChangeEventGlobal(true);
                break;
            case "false":
                this.handleChangeEventGlobal(false);
                break;
            case "null":
                this.handleChangeEventGlobal(null);
                break;
            default:
                this.handleChangeEventGlobal(null);
        }    }    isEmpty() {
        return false;
    }

    handleChangeJsEvent(event: any) {
        return this.state.value;
    }


    handleChangeData(args: boolean) {
        return {
            hasError: false,
            errorMessage: null,
            correctValue: args
        };
    }

    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}
