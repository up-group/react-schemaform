export default class JsonSchemaHelper {
    static getBaseType(schema: JsonSchema): string {
        if (typeof (schema.type) === "string") {
            return schema.type as string;
        } else if (schema.type.indexOf("null") != -1) {
            return schema.type[0];
        }
    };

    static isNullable(schema: JsonSchema): boolean {
        return schema.type.indexOf("null") != -1;
    }


    static parseSchema(schema: string): JsonSchema {
        var data = JSON.parse(schema) as JsonSchema;

        if (data.definitions == undefined) {
            return data;
        }
        else {
            return this.flat(data, data.definitions, {});
        }
    }

    static flat(data: JsonSchema, originalDefinitions: { [index: string]: JsonSchema }, flattenedDefinitions: { [index: string]: JsonSchema }): JsonSchema {
        for (var index in data) {

            if (index === "definitions" || data.hasOwnProperty(index) == false) {
                continue;
            }

            if (data[index] != null && data[index]["$ref"] !== undefined) {
                data[index] = this.getFromDefinition(data[index]["$ref"], originalDefinitions, flattenedDefinitions);
            } else if (typeof (data[index]) !== "string") {
                this.flat(data[index], originalDefinitions, flattenedDefinitions);
            }
        }

        return data;
    }

    static getFromDefinition(id: string, originalDefinitions: { [index: string]: JsonSchema }, flattenedDefinitions: { [index: string]: JsonSchema }) {

        var isAlreadyFlattened = flattenedDefinitions[id] == undefined;
        if (isAlreadyFlattened) {
            flattenedDefinitions[id] = originalDefinitions[id.split('/')[2]];
            this.flat(flattenedDefinitions[id], originalDefinitions, flattenedDefinitions);
        }

        return flattenedDefinitions[id];
    }

}

