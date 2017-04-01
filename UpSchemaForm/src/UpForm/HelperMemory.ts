export default class HelperMemory {

    static AssignValue(obj, nodes, value) {
        var data = obj || {};
        var prop = nodes.shift();
        if (nodes.length === 0) {
            data[prop] = value;
            return data;
        } else if (data.hasOwnProperty(prop) && typeof (data[prop]) === "object") {
            data[prop] = this.AssignValue(data[prop], nodes, value);
            return data;
        } else if (data.hasOwnProperty(prop) === false) {
            data[prop] = {}
            data[prop] = this.AssignValue(data[prop], nodes, value);
            return data
        }
    }

}