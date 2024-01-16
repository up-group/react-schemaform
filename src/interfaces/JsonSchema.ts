export type InternalTypeOfSchema =
  | "null"
  | "object"
  | "string"
  | "number"
  | "integer"
  | "boolean"
  | "array";

export type InternalFormatOfSchema =
  | "date"
  | "date-time"
  | "time"
  | "entityKey"
  | "enum"
  | "enumInline"
  | "upload"
  | "month"
  | "email"
  | "phone"
  | "multilineText"
  | "imageUrl"
  | "uri"
  | "search";

export type ReturnType = "id" | "full";

export interface EnumsAuthorization {
  role: string;
  enum: string[];
  default?: any;
}

export interface JsonSchema {
  $ref?: string;
  id?: string;
  $schema?: JsonSchema;
  title?: string;
  description?: string;
  default?: any;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  patternErrorMessage?: string;
  additionalItems?: boolean | JsonSchema;
  items?: JsonSchema | JsonSchema[];
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  additionalProperties?: boolean | JsonSchema;
  definitions?: { [key: string]: JsonSchema };
  properties?: { [property: string]: JsonSchema };
  patternProperties?: { [pattern: string]: JsonSchema };
  dependencies?: { [key: string]: JsonSchema | string[] };
  enum?: any[];
  type?: InternalTypeOfSchema | InternalTypeOfSchema[];
  allOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  oneOf?: JsonSchema[];
  not?: JsonSchema;
  format?: InternalFormatOfSchema;
  enumDescriptions?: string[];
  enumNames?: string[];
  hiddenEnumValues?: string[];
  entitySource?: {
    id: string;
    name: string;
    text: string;
    query: string;
    queryParameterName: string;
    data?: any;
    autoload?: boolean;
    defaultParameters?: { [key: string]: any };
    fetchData?: (
      input: string,
      defaultParameters?: { [key: string]: string }
    ) => Promise<any>;
    returnType?: ReturnType;
  };
  fileExtension?: string;
  readonly?: boolean;
  hide?: boolean | string;
  advanced?: boolean;
  order?: number;
  referenceTo?: string;
  getEntitySelector?: (
    itemsSetter: (data: any, error: any) => void
  ) => JSX.Element;
  isToggle?: boolean;
  optionsSource?: () => { [key: string]: any };
  optionsSchema?: { [key: string]: any };
  idKey?: string;
  textKey?: string;
  groupingInfo?: { [key: string]: any };

  colspan?: number;
  component?: string;
  breakAfter?: boolean;
  props?: { [key: string]: any } | string;
  from?: string;
  name?: string;
  displayIfEmpty?: boolean;

  habilitations?: EnumsAuthorization[];

  targetPropertyValueGeneration?: {
    calculateValue?: (
      input: string,
      defaultParameters?: { [key: string]: string }
    ) => any;
    targetProperty?: string;
    operationName?: string;
  };
}

export type AdditionalProps = { [key: string]: any };
