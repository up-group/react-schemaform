export default class JsonSchemaHelper {
    static getBaseType(schema: JsonSchema): string;
    static isNullable(schema: JsonSchema): boolean;
    static parseSchema(schema: string): JsonSchema;
    static flat(data: JsonSchema, originalDefinitions: {
        [index: string]: JsonSchema;
    }, flattenedDefinitions: {
        [index: string]: JsonSchema;
    }): JsonSchema;
    static getFromDefinition(id: string, originalDefinitions: {
        [index: string]: JsonSchema;
    }, flattenedDefinitions: {
        [index: string]: JsonSchema;
    }): JsonSchema;
}
