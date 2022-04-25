import * as _ from 'lodash'
import { JsonSchema, InternalTypeOfSchema} from "../interfaces/JsonSchema";

export default class JsonSchemaHelper {
  static getBaseType(schema: JsonSchema): string {
    if (schema.type == undefined) {
      return "";
    } else if (typeof schema.type === "string") {
      return schema.type as string;
    } else if (schema.type.indexOf("null") != -1) {
      return schema.type[0];
    }
  }

  static isNullable(schema: JsonSchema): boolean {
    return (schema.type as InternalTypeOfSchema[]).indexOf("null") != -1;
  }

  static parseSchema(schema: string): JsonSchema {
    var data = JSON.parse(schema) as JsonSchema;

    if (data.definitions == undefined) {
      return data;
    } else {
      return this.flat(data, data.definitions, {});
    }
  }

  static flat(
    data: JsonSchema,
    originalDefinitions: { [index: string]: JsonSchema },
    flattenedDefinitions: { [index: string]: JsonSchema }
  ): JsonSchema {
    if (originalDefinitions == undefined) {
      return data;
    }

    for (var index in data) {
      if (index === "definitions" || data.hasOwnProperty(index) == false) {
        continue;
      }

      if (data[index] != null && data[index]["$ref"] !== undefined) {
        let definition = this.getFromDefinition(
          data[index]["$ref"],
          originalDefinitions,
          flattenedDefinitions
        );

        if(data[index]['properties']) {
          data[index]["type"] =   data[index]["type"] || definition['type'] ;
          let propertiesNames = Object.getOwnPropertyNames(data[index]['properties']) ;
          for(let propertyName of propertiesNames) {
            data[index]['properties'][propertyName] = { ...definition['properties'][propertyName], ...data[index]['properties'][propertyName] }
          }
        } else if (data[index]['items'] && data[index]['items']['properties']) {
            data[index]["type"] =   data[index]["type"] || definition['type'] ;
            let propertiesNames = Object.getOwnPropertyNames(data[index]['items']['properties']) ;
            for(let propertyName of propertiesNames) {
              data[index]['items']['properties'][propertyName] = { ...definition['items']['properties'][propertyName], ...data[index]['items']['properties'][propertyName] }
            }
        } else {
          data[index] = {...data[index], ...definition};
        }

        delete data[index]["$ref"];
      } else if (typeof data[index] !== "string") {
        this.flat(data[index], originalDefinitions, flattenedDefinitions);
      }
    }

    return data;
  }

  static getFromDefinition(
    id: string,
    originalDefinitions: { [index: string]: JsonSchema },
    flattenedDefinitions: { [index: string]: JsonSchema }
  ) {
    var isNotAlreadyFlattened = flattenedDefinitions[id] == undefined;
    if (isNotAlreadyFlattened) {
      var pathToDefinition = id.replace("#/definitions/", "").replace(/\//g, ".");
      flattenedDefinitions[id] = _.get(originalDefinitions, pathToDefinition);
      
      this.flat(
        flattenedDefinitions[id],
        originalDefinitions,
        flattenedDefinitions
      );
    }

    return flattenedDefinitions[id];
  }
}
