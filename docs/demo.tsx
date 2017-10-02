import * as React from 'react';
import * as ReactDOM from 'react-dom';
import UpSchemaForm from '../src/UpSchemaForm'
import { UpNumber, UpThemeProvider, UpThemeInterface, UpSwitch } from '@up-group/react-controls'

interface DemoState {
    result: string;
    schema: JsonSchema;
    hasError: boolean;
    showError: boolean;
    nb?: number;
    dataS: any;
}

var theme: any = {};


class Demo extends React.Component<{}, DemoState> {
    constructor(p, c) {
        super(p, c);
        this.state = {
            nb: 55, result: '', schema: {}, hasError: false, showError: false, dataS: {

            }
        }
    }

    render() {
        var schemas: { id: string, data: JsonSchema }[] = [
            {
                data: {
                    'title': 'test',
                    'type': 'object',
                    'properties': {
                        'number': { 'type': 'number' },
                        'integer': { 'type': 'integer' },
                        'boolean': { 'type': 'boolean' },
                        'string': { 'type': 'string' }
                    }
                },
                id: 'base'
            },
            {
                data: {
                    'title': 'date',
                    'type': 'object',
                    'properties': {
                        'date': { 'type': 'string', 'format': 'date' },
                        'time': { 'type': 'string', 'format': 'time' },
                        'datetime': { 'type': 'string', 'format': 'date-time' }
                    }
                },
                id: 'DateTime'
            },

            {
                data: { 'title': 'number', 'type': 'object', 'properties': { 'int1': { 'title': 'int', 'type': 'integer', 'default': 0 }, 'int2': { 'title': 'intR', 'type': 'integer', 'default': 0 }, 'int3': { 'title': 'int10-25', 'type': 'integer', 'default': 0, 'minimum': 10, 'maximum': 25 }, 'int4': { 'title': 'int def 10', 'type': 'integer', 'default': 10 }, 'dec1': { 'title': 'decimal', 'type': 'number', 'default': 0 } }, 'required': ['int2'] }
                ,
                id: 'aaaaa'
            },


            {
                data: {
                    'title': 'Required',
                    'type': 'object',
                    'properties': {
                        'number': { 'type': 'number' }
                    },
                    'required': ['number']
                },
                id: 'required'
            },
            {
                data: {
                    'title': 'MAX / MIN',
                    'type': 'object',
                    'properties': {
                        'size': {
                            'type': 'number',
                            'minimum': 5.0,
                            'maximum': 10.5
                        }
                    },
                },
                id: 'MAX / MIN'
            },
            {
                data: {
                    'title': 'enum',
                    'type': 'object',
                    'properties': {
                        'size': {
                            'enumNames': ['choix1', 'choix2', 'choix3'],
                            'enumDescriptions': ['Premier choix', 'Second choix', 'Troisieme choix'],
                            'type': 'integer',
                            'format': 'enum',
                            'enum': [2, 4, 6]
                        }

                    },
                },
                id: 'enum'
            },
            {
                data: {
                    'title': 'upload',
                    'type': 'object',
                    'properties': {
                        'file':
                        {
                            'fileExtension': '.csv',
                            'type': ['string', 'null'],
                            'default': null,
                            'format': 'upload'
                        }
                    },
                },
                id: 'upload'
            },
            ,
            {
                data: {
                    'title': 'everyone',
                    'type': 'object',
                    'properties': {
                        'a': {
                            'title': 'boolean', 'type': 'boolean'
                        },
                        'b': { 'title': 'integer', 'type': 'integer' },
                        'c': { 'title': 'number', 'type': 'number' },
                        'd': { 'title': 'string', 'type': 'string' },
                        'e': { 'title': 'date', 'type': 'string', 'format': 'date' },
                        'f': { 'title': 'date-time', 'type': 'string', 'format': 'date-time' },
                        'g': { 'title': 'time', 'type': 'string', 'format': 'time' },
                        'h': { 'title': 'month', 'type': 'string', 'format': 'month' },
                        'i': { 'title': 'upload', 'type': 'string', 'format': 'upload' },
                        'j': {
                            'title': 'enum',
                            'enumNames': ['choix1', 'choix2', 'choix3'],
                            'enumDescriptions': ['Premier choix', 'Second choix', 'Troisieme choix'],
                            'type': 'integer',
                            'format': 'enum',
                            'enum': [2, 4, 6]
                        }

                    },
                },
                id: 'everyone'
            },
            {
                data: {
                    'title': 'R',
                    'type': 'object',
                    'properties': {
                        'a': {
                            'title': 'boolean', 'type': 'boolean'
                        },
                        'b': { 'title': 'integer', 'type': 'integer' },
                        'c': { 'title': 'number', 'type': 'number' },
                        'd': { 'title': 'string', 'type': 'string' },
                        'e': { 'title': 'date', 'type': 'string', 'format': 'date' },
                        'f': { 'title': 'date-time', 'type': 'string', 'format': 'date-time' },
                        'g': { 'title': 'time', 'type': 'string', 'format': 'time' },
                        'h': { 'title': 'month', 'type': 'string', 'format': 'month' },
                        'i': { 'title': 'upload', 'type': 'string', 'format': 'upload' },
                        'j': {
                            'title': 'enum',
                            'enumNames': ['choix1', 'choix2', 'choix3'],
                            'enumDescriptions': ['Premier choix', 'Second choix', 'Troisieme choix'],
                            'type': 'integer',
                            'format': 'enum',
                            'enum': [2, 4, 6]
                        },
                        'k': { 'title': 'phone', 'type': 'string', 'format': 'phone' },
                        'l': { 'title': 'email', 'type': 'string', 'format': 'email' }

                    },
                    required: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
                },
                id: 'R'
            },
            {
                data: {
                    'title': 'R',
                    'type': 'object',
                    'properties': {
                        'b': { 'title': 'integer', 'type': 'integer' },
                        'c': { 'title': 'number', 'type': 'number' },
                        'd': { 'title': 'numberMax', 'type': 'number', maximum: 100 },
                        'e': { 'title': 'numberMin', 'type': 'number', minimum: 50 },
                        'f': { 'title': 'numberR', 'type': 'number' }
                    },
                    required: ['f']
                },
                id: 'test'
            },
            {
                data: {
                    'title': 'R',
                    'type': 'object',
                    'properties': {
                        'datetime': {
                            'title': 'date-time',
                            'type': 'object',
                            'properties': {
                                'a': { 'title': 'date', 'type': 'string', format: 'date-time' },
                                'b': { 'title': 'dateN', 'type': ['string', 'null'], format: 'date-time' },
                                'c': { 'title': 'dateR', 'type': 'string', format: 'date-time' }
                            },
                            required: ['c']
                        },
                        'date': {
                            'title': 'date',
                            'type': 'object',
                            'properties': {
                                'a': { 'title': 'date', 'type': 'string', format: 'date' },
                                'b': { 'title': 'dateN', 'type': ['string', 'null'], format: 'date' },
                                'c': { 'title': 'dateR', 'type': 'string', format: 'date' }
                            },
                            required: ['c']
                        },
                        'time': {
                            'title': 'time',
                            'type': 'object',
                            'properties': {
                                'a': { 'title': 'time', 'type': 'string', format: 'time' },
                                'b': { 'title': 'timeN', 'type': ['string', 'null'], format: 'time' },
                                'c': { 'title': 'timeR', 'type': 'string', format: 'time' }
                            },
                            required: ['c']
                        },
                        'boolean': {
                            'title': 'boolean',
                            'type': 'object',
                            'properties': {
                                'a': { 'title': 'boolean', 'type': 'boolean' },
                                'b': { 'title': 'booleanN', 'type': ['boolean', 'null'] }
                            }
                        },
                        'enum': {
                            'title': 'enum',
                            'type': 'object',
                            'properties': {
                                'a': { 'title': 'time', 'type': 'integer', format: 'enum', enum: [2, 4, 6], 'enumNames': ['choix1', 'choix2', 'choix3'], 'enumDescriptions': ['Premier choix', 'Second choix', 'Troisieme choix'] },
                                'b': { 'title': 'timeN', 'type': ['integer', 'null'], format: 'enum', enum: [2, 4, 6], 'enumNames': ['choix1', 'choix2', 'choix3'], 'enumDescriptions': ['Premier choix', 'Second choix', 'Troisieme choix'] },
                                'c': { 'title': 'timeR', 'type': 'integer', format: 'enum', enum: [2, 4, 6], 'enumNames': ['choix1', 'choix2', 'choix3'], 'enumDescriptions': ['Premier choix', 'Second choix', 'Troisieme choix'] }
                            },
                            required: ['c']
                        },
                        'string': {
                            'title': 'string',
                            'type': 'object',
                            'properties': {
                                'a': { 'title': 'str', 'type': 'string' },
                                'b': { 'title': 'strN', 'type': ['string', 'null'] },
                                'c': { 'title': 'strR', 'type': 'string' }
                            },
                            required: ['c']
                        },
                        'stringM': {
                            'title': 'string',
                            'type': 'object',
                            'properties': {
                                'a': { 'title': 'str', 'type': 'string', format: 'multilineText' },
                                'b': { 'title': 'strN', 'type': ['string', 'null'], format: 'multilineText' },
                                'c': { 'title': 'strR', 'type': 'string', format: 'multilineText' }
                            },
                            required: ['c']
                        },
                        'number': {
                            'title': 'number',
                            'type': 'object',
                            'properties': {
                                'a': { 'title': 'number', 'type': 'number' },
                                'b': { 'title': 'numberN', 'type': ['number', 'null'] },
                                'c': { 'title': 'numberR', 'type': 'number' },
                                'd': { 'title': 'numberMin10', 'type': 'number', minimum: 10 },
                                'e': { 'title': 'numberMax10', 'type': 'number', maximum: 10 }
                            },
                            required: ['c']
                        },
                        'integer': {
                            'title': 'integer',
                            'type': 'object',
                            'properties': {
                                'a': { 'title': 'integer', 'type': 'integer' },
                                'b': { 'title': 'integerN', 'type': ['integer', 'null'] },
                                'c': { 'title': 'integerR', 'type': 'integer' },
                                'd': { 'title': 'integerMin10', 'type': 'integer', minimum: 10 },
                                'e': { 'title': 'integerMax10', 'type': 'integer', maximum: 10 }
                            },
                            required: ['c']
                        },
                        'phone': {
                            'title': 'phone',
                            'type': 'object',
                            'properties': {
                                'a': { 'title': 'phone', 'type': 'string', format: 'phone' },
                                'b': { 'title': 'phoneN', 'type': ['string', 'null'], format: 'phone' },
                                'c': { 'title': 'phoneR', 'type': 'string', format: 'phone' }
                            },
                            required: ['c']
                        },
                        'email': {
                            'title': 'email',
                            'type': 'object',
                            'properties': {
                                'a': { 'title': 'email', 'type': 'string', format: 'email' },
                                'b': { 'title': 'emailN', 'type': ['string', 'null'], format: 'email' },
                                'c': { 'title': 'emailR', 'type': 'string', format: 'email' }
                            },
                            required: ['c']
                        }

                    }
                },
                id: 'all'
            }

        ];


        var sc: JsonSchema = { title: 'MAX / MIN', 'type': 'object', 'properties': { 'size': { 'type': 'number', 'minimum': 5, 'maximum': 10.5 } } }
        //var a: JsonSchema = {
        //    "title": "RECHERCHE D'ARTICLES", "type": "object", "properties":
        //    {
        //        "LieuStockId": {
        //            "title": "Lieu de stock",
        //            "entitySource": { "id": "Id", "name": "LieuStock", "text": "{Nom}", "query": "/AtHome/api/domain/LieuStock/LieuStockSearchQuery", "queryParameterName": "args" },
        //            "type": ["string", "null"],
        //            "default": null,

        //            "format": "entityKey"
        //        }, "PatientId": { "title": "Patient", "entitySource": { "id": "Id", "name": "Patient", "text": "{Prenom} - {Nom}", "query": "/AtHome/api/domain/Patient/PatientSearchQuery", "queryParameterName": "args" }, "type": ["number", "null"], "default": null, "format": "entityKey" }, "LotSerie": { "title": "Lot/Série", "type": ["string", "null"], "default": null }, "ProduitIds": { "title": "Produit", "type": ["array", "null"], "default": null, "items": { "title": "Produit", "entitySource": { "id": "Id", "name": "Produit", "text": "{Nom}", "query": "/AtHome/api/domain/Produit/ProduitSearchQuery", "queryParameterName": "args" }, "type": "string", "format": "entityKey" } }, "SortieDuStock": { "title": "Sortie du stock", "type": ["boolean", "null"], "default": null }, "LocalisationState": { "title": "Etat", "enumNames": [null, "Disponible", "SelectionnePourMouvement", "PretAEtreDeplace", "EnDeplacement"], "enumDescriptions": [null, "Disponible", "Sélectionné pour un mouvement", "Prêt à être déplacé", "En déplacement"], "type": ["integer", "null"], "default": null, "format": "enum", "enum": [null, 0, 1, 2, 3] }
        //    }
        //}
        var a: JsonSchema = {
            "type": "object", "properties":
            {
                "Reference": {
                    "title": "Référence", "type": ["string", "null"],
                    "default": null
                }, "Nom": {
                    "title": "Nom", "type": ["string", "null"],
                    "default": null
                }, "TypeMvt": {
                    "title": "Type", "type": ["array", "null"],
                    "default": null, "items": {
                        "title": "Type", "enumNames":
                        ["Materiel", "Medicament", "Consommable", "KitMateriel", "KitMedicament", "KitConsommable"],
                        "enumDescriptions": ["Matériel", "Médicament", "Consommable", "Kit de matériels", "Kit de médicaments",
                            "Kit de consommables"], "type": "integer", "format": "enum", "enum": [0, 1, 2, 3, 4, 5]
                    }
                }, "Visible": {
                    "title": "Visible", "type": ["boolean", "null"],
                    "default": null
                }, "FournisseurId": {
                    "title": "Fournisseur", "advanced": true,
                    "entitySource": {
                        "id": "", "name": "Fournisseur", "text": "{FOURNNOM}",
                        "query": "/api/domain/Fournisseur/FournisseurSearchQuery", "queryParameterName": "args"
                    }, "type": ["number", "null"], "default": null, "format": "entityKey"
                }, "CategorieId": {
                    "title": "Catégorie", "advanced": true, "entitySource":
                    { "id": "Id", "name": "Categorie", "text": "{Nom}", "query": "/api/domain/Categorie/CategorieSearchQuery", "queryParameterName": "args" },
                    "type": ["string", "null"], "default": null, "format": "entityKey"
                }, "DenominationCommuneId": {
                    "title": "Dénomination commune", "advanced": true,
                    "entitySource": {
                        "id": "Id", "name": "DenominationCommune", "text": null,
                        "query": "/api/domain//", "queryParameterName": "args"
                    }, "type": ["string", "null"], "default": null, "format": "entityKey"
                }, "ConservationId": {
                    "title": "Conservation", "advanced": true,
                    "entitySource": { "id": "Id", "name": "Conservation", "text": null, "query": "/api/domain//", "queryParameterName": "args" }, "type": ["string", "null"], "default": null, "format": "entityKey"
                }, "MedicamentStatutId": {
                    "title": "Statut", "advanced": true,
                    "entitySource": { "id": "Id", "name": "MedicamentStatut", "text": null, "query": "/api/domain//", "queryParameterName": "args" }, "type": ["string", "null"], "default": null, "format": "entityKey"
                }, "PrepaHosp": {
                    "title": "Péparation Hospitalière",
                    "advanced": true, "type": "boolean", "default": false
                }, "LivretTherapeutique": {
                    "title": "Livret thérapeutique",
                    "advanced": true, "type": "boolean", "default": false
                }, "ColonnesToDisplay": {
                    "title": "Colonne", "advanced": true,
                    "type": ["array", "null"], "default": null,
                    "items": {
                        "title": "Colonne",
                        "advanced": true,
                        "enumNames": ["Marque", "Categorie", "Conservation", "TypeProduit", "DenominationCommune", "MedicamentStatut", "Quantite"],
                        "enumDescriptions": ["Marque", "Catégorie", "Conservation", "Type de produits", "Dénomination commune", "Statut du médicament", "Quantité"], "type": "integer", "format": "enum", "enum": [0, 1, 2, 3, 4, 5, 6]
                    }
                }, "Receptionnable": {
                    "title": "Produits réceptionnables",
                    "advanced": true, "type": ["boolean", "null"], "default": null
                }, "Commandable": {
                    "title": "Produits commandables", "advanced": true,
                    "type": ["boolean", "null"], "default": null
                }
            }
        }

        var b: JsonSchema = {
            "type": "object", "properties": {
                "ColonnesToDisplay": {

                    "title": "Colonne",
                    "advanced": false,
                    "enumNames": ["Marque", "Categorie", "Conservation", "TypeProduit", "DenominationCommune", "MedicamentStatut", "Quantite"],
                    "enumDescriptions": ["Marque", "Catégorie", "Conservation", "Type de produits", "Dénomination commune", "Statut du médicament", "Quantité"],
                    "type": "integer",
                    "format": "enum",
                    "enum": [0, 1, 2, 3, 4, 5, 6]

                },
                "LieuStockId": {
                    "title": "Lieu de stock",
                    "entitySource": { "id": "id", "name": "LieuStock", "text": "{name}", "query": "https://jsonplaceholder.typicode.com/users", "queryParameterName": "args" },
                    "type": ["string", "null"],
                    "default": null,

                    "format": "entityKey"
                },
                LisuS: {
                    "type": ["array", "null"],
                    "title": "Lieus",
                    "default": null,
                    "items": {
                        "title": "Lieus",
                        "entitySource": { "id": "id", "name": "LieuStock", "text": "{name}", "query": "https://jsonplaceholder.typicode.com/users", "queryParameterName": "args" },
                        "type": ["string", "null"],
                        "default": null,
                        "format": "entityKey"
                    }
                },
                'a': {
                    'title': 'boolean',
                    'type': 'boolean'
                },
                'b': { 'type': 'string', 'format': 'date' },
                'c': {
                    'title': 'boolean',
                    'type': ['boolean', "null"]
                }
            }
        }

        if (1 === 1) {

            return <div>
                <UpSchemaForm initValue={this.state.dataS} showError={this.state.showError} schema={b} onFormPayload={this.onFormPayload}>
                </UpSchemaForm>
                {JSON.stringify(this.state.dataS)}
            </div>
        }





        //   <UpButton fontSize='xlarge'>test</UpButton>
        //</UpThemeProvider >
        return <UpThemeProvider theme={theme}>
            <div>
                <select className='form-control' defaultValue='' onChange={this.selectChange} required>
                    {
                        schemas.map((schema) => {
                            return <option key={schema.id} value={JSON.stringify(schema.data)}>{schema.id}</option>;
                        })
                    }
                </select>

                <textarea value={JSON.stringify(this.state.schema)} className='form-control' cols={100} rows={3} onChange={this.onSchemaChange}></textarea>

                <UpNumber onChange={(data) => { this.setState({ nb: data as number }); }} />

                <hr />
                <UpSchemaForm initValue={{ size: this.state.nb }} showError={this.state.showError} schema={this.state.schema} onFormPayload={this.onFormPayload}>
                </UpSchemaForm>
                <hr />
                <div style={{
                    color: this.state.hasError ? 'red' : 'green',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    background: 'white',
                    border: '1px solid black',
                    width: '100%',
                    padding: '15px'
                }}>
                    {this.state.result}
                </div>
            </div>


        </UpThemeProvider >
    }

    onEditorChange = (e) => {
    }

    onSchemaChange = (e) => {
        this.setState({ result: '', schema: JSON.parse(e.target.value) });
    }

    onFormPayload = (e, hasError: boolean) => {
        console.log(e)
        this.setState({ dataS: e });
        //this.setState({ result: JSON.stringify(e), hasError: hasError });
    }

    selectChange = (e) => {
        this.setState({ schema: JSON.parse(e.target.value) });
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'));
