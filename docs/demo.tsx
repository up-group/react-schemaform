import * as React from "react";
import * as ReactDOM from "react-dom";
import UpSchemaForm from "../src/UpSchemaForm";
import {
    UpNumber,
    UpThemeProvider,
    UpThemeInterface,
    UpDefaultTheme
} from "@up-group-ui/react-controls";

import axios, { AxiosResponse } from "axios";

import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";

import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { JsonSchemaHelper } from "../src";
import { style } from "typestyle";
import { PropertyViewModel } from "../src/UpForm/UpSchemaFormComponentSelector";

//ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-07.json"));

interface DemoState {
    result: string;
    schema: any;
    hasError: boolean;
    showError: boolean;
    nb?: number;
    dataS: any;
}

const schema = {
    definitions: {
        PaginationProperties: {
            type: ["object", "null"],
            default: null,
            properties: {
                page_number: { type: "integer", default: 0 },
                page_size: { type: "integer", default: 0 },
                sort_property_name: { type: ["string", "null"], default: null },
                sort_order: { type: ["integer", "null"], default: null },
            },
        },
    },
    type: "object",
    properties: {
        pagination_properties: {
            $ref: "#/definitions/PaginationProperties",
            hide: true,
        },
       
        establishment_id: {
            title: "Établissement",
            type: ["string", "null"],
            default: null,
            format: "entityKey",
            entitySource: {
                endPoint:
                    "https://up-france-odi-services-customer-test-app.azurewebsites.net/",
                queryParameterName: "search",
                text: "name",
                id: "id",
                query: "v1/establishements/searchestablishment",
            },
        },
        // start_date: {
        //     title: "Date de début",
        //     type: ["string", "null"],
        //     default: null,
        //     format: "date",
        // },
        // end_date: {
        //     title: "Date de fin",
        //     type: ["string", "null"],
        //     default: null,
        //     format: "date",
        // },
        settlement_reference: {
            title: "Numéro de télécollecte",
            type: ["string", "null"],
            default: null,
        },
        email: {
            title: "Email",
            type: ["string", "null"],
            format: 'email',
            default: null,
        },
        phone: {
            title: "Phone",
            type: ["string", "null"],
            format: 'phone',
            default: null,
        },
        amount: {
            title: "Montant",
            type: "integer",
            default: null
        },
        number: {
            title: "Nombre",
            type: "array",
            default: null,
            items: {
                title: "Jours du mois",
                type: "integer"
            }
        },
        active: {
            title: "Activé",
            type: "boolean",
            default: false,
            isToggle: true,
        },
        frequency_of_payment: {
            title: "Établissement",
            enumNames: ["Standard", "Specifique"],
            enumDescriptions: ["Standard", "Spécifique"],
            type: "integer",
            default: 1,
            format: "enum",
            enum: [1, 2]
        },
        multipleRadioDescription: {
            title: "Commerçants trouvés",
            enumNames: [null],
            enumDescriptions: [null],
            type: "integer",
            default: 0,
            format: "enum",
            enum: [null],
            idKey: "codeCrt",
            textKey: "compteClient",
            optionsSchema: {
                type: "object",
                properties: {
                    codeCrt: {
                        type: "string",
                        title: "Code CRT"
                    },
                    compteClient: {
                        type: "string",
                        title: "N° Compte Client"
                    },
                    raisonSociale: {
                        type: "string",
                        title: "Raison Sociale",
                    },
                    DenCommerciale: {
                        type: "string",
                        title: "Dén. Commerciale"
                    },
                    Ville: {
                        type: "string",
                        title: "Ville"
                    },
                    source: {
                        type: "string",
                        title: "source",
                        hide: true
                    }
                }
            },
            entitySource: { 
                fetchData : (args) => ( new Promise((resolve, reject) => {
                    setTimeout(() =>
                        resolve([
                            {
                                codeCrt: "Code 123456",
                                compteClient: "1234567890",
                                raisonSociale: "Raison Sociale",
                                DenCommerciale: "Dén. Commerciale",
                                Ville: "Paris",
                                source: "BMC"
                            },
                            {
                                codeCrt: "Code 456",
                                compteClient: "1234567890",
                                raisonSociale: "Raison Sociale",
                                DenCommerciale: "Dén. Commerciale",
                                Ville: "Paris",
                                source: "INSEE"
                            }
                        ]), 5000);
                }))
            },
            groupingInfo: {
                discriminator: "source",
                groups: [
                    {
                        title: "SOURCE- BMC",
                        discriminator: "BMC",
                        color: "orange"
                    },
                    {
                        title: "SOURCE- INSEE",
                        discriminator: "INSEE",
                        color: "black"
                    }
                ]
            }
        },
        departure_date: {
            title: "Date de depart ",
            type: ["string", "null"],
            default: null,
            format: "date",
        },
        arrival_date: {
            title: "Date d'arrivée",
            type: ["string", "null"],
            default: null,
            format: "date",
        },
        creation_date: {
            title: "Date de création",
            type: ["string", "null"],
            default: null,
            format: "date",
        },
        expiration_date: {
            title: "Date d'expiration",
            type: ["string", "null"],
            default: null,
            format: "date",
        },

        roles: {
            format: "enum",
            title: "Selection multiple",
            type: ["array", "null"],
            enum: [
                "1",
                "2",
                "4",
                "8",
                "16"
            ],
            enumDescriptions: [
                "Livraison",
                "Gestionnaire",
                "Facturation",
                "Décideur",
                "Mandataire"
            ],
            enumNames: [
                "Shipping",
                "Management",
                "Invoicing",
                "DecisionMaker",
                "Mandatary"
            ]
        }
    },
    viewModels: [
        {
            name: "number",
            additionalProps: {
                maxValue: 31,
                minValue: 1,
                maxNumberOfValue: 4,
                preffixText: 'Le ',
                suffixText: ' du mois',
                itemWidth: '70px'
            },
        },
        {
            name: "frequency_of_payment",
            additionalProps: {
                componentType: "Radio"
            }
        },
        {
            name: "multipleRadioDescription",
            additionalProps: {
                componentType: "Radio",
                multipleDescriptionLabels: "true",
                displayMode: "large",
                alignMode: "horizontal"
            }
        },
        {
            name: "start_date",
            additionalProps: {
                minDate: "today"
            }
        },
        {
            name: "end_date",
            additionalProps: {
                minDate: "today"
            }
        },
        {
            name: "departure_date",
            additionalProps: {
                caseOf : "start_date",
                isRelatedTo : "arrival_date"
            }
        },
        {
            name: "arrival_date",
            additionalProps: {
                caseOf : "end_date",
                isRelatedTo : "departure_date"
            }
        },
        {
            name: "creation_date",
            additionalProps: {
                caseOf : "start_date",
                isRelatedTo : "expiration_date"
            }
        },
        {
            name: "expiration_date",
            additionalProps: {
                caseOf : "end_date",
                isRelatedTo : "creation_date"
            }
        },
        
    ],
}

class Demo extends React.Component<{}, DemoState> {
    constructor(p, c) {
        super(p, c);
        this.state = {
            nb: 55,
            result: "",
            schema: schema,
            hasError: false,
            showError: false,
            dataS: {
                active: true,
                number: [1],
                maxNumberOfValue: 4,
                maxValue: 31,
                minValue: 1
            },
        };
    }

    render() {
        return (
            <UpThemeProvider theme={UpDefaultTheme}>
                <>
                    <UpSchemaForm
                        initValue={this.state.dataS}
                        value={this.state.dataS}
                        showError={this.state.showError}
                        schema={this.state.schema}
                        onFormChange={this.onFormPayload}
                        wrapperClassName={style({
                            padding: "10px"
                        })}
                        withFloatingLabel={true}
                        viewModels={this.state.schema.viewModels}
                        translate={text => {
                            if (text === "Authorized") return "Authorisée";
                            return text;
                        }}
                        updateRules={[{
                            targetField: "data_type",
                            trackedField: "search",
                            handler: (value: any) => {
                                if (value.length === 14)
                                    return { type: 2 };
                                return { type: 3 };
                            }
                        }]}
                        gutter={10}
                        rowSpacing={25}
                        defaultColspan={8}

                    //ignoredProperties={["pagination_properties"]}
                    />
                    <button onClick={(e: any) => this.setState({ dataS: {} })}>Reset</button>
                    <JSONInput
                        id="a_unique_id"
                        placeholder={this.state.schema}
                        locale={locale}
                        theme="light_mitsuketa_tribute"
                        colors={{
                            string: "#DAA520" // overrides theme colors with whatever color value you want
                        }}
                        onChange={this.onSchemaChange}
                    />
                </>
            </UpThemeProvider>
        );
    }

    onEditorChange = e => { };

    onSchemaChange = value => {
        this.setState({ result: "", schema: value.jsObject });
    };

    onFormPayload = (e, hasError: boolean) => {
        this.setState({ dataS: e });
    };
}

ReactDOM.render(<Demo />, document.getElementById("root"));
