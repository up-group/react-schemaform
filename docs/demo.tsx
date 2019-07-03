import * as React from "react";
import * as update from "react-addons-update";
import * as ReactDOM from "react-dom";
import UpSchemaForm from "../src/UpSchemaForm";
import {
  UpNumber,
  UpThemeProvider,
  UpThemeInterface
} from "@up-group/react-controls";

import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";

import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

//ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-07.json"));

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
      nb: 55,
      result: "",
      schema: {
        type: "object",
        properties: {
          Reference: {
            title: "Référence",
            type: ["string", "null"],
            default: null
          },
          Nom: {
            title: "Nom",
            type: ["string", "null"],
            default: null
          },
          TypeMvt: {
            title: "Type",
            type: ["array", "null"],
            default: null,
            items: {
              title: "Type",
              enumNames: [
                "Materiel",
                "Medicament",
                "Consommable",
                "KitMateriel",
                "KitMedicament",
                "KitConsommable"
              ],
              enumDescriptions: [
                "Matériel",
                "Médicament",
                "Consommable",
                "Kit de matériels",
                "Kit de médicaments",
                "Kit de consommables"
              ],
              type: "integer",
              format: "enum",
              enum: [0, 1, 2, 3, 4, 5]
            }
          },
          Visible: {
            title: "Visible",
            type: ["boolean", "null"],
            default: null
          },
          FournisseurId: {
            title: "Fournisseur",
            advanced: true,
            entitySource: {
              id: "",
              name: "Fournisseur",
              text: "{FOURNNOM}",
              query: "/api/domain/Fournisseur/FournisseurSearchQuery",
              queryParameterName: "args"
            },
            type: ["number", "null"],
            default: null,
            format: "entityKey"
          },
          CategorieId: {
            title: "Catégorie",
            advanced: true,
            entitySource: {
              id: "Id",
              name: "Categorie",
              text: "{Nom}",
              query: "/api/domain/Categorie/CategorieSearchQuery",
              queryParameterName: "args"
            },
            type: ["string", "null"],
            default: null,
            format: "entityKey"
          },
          DenominationCommuneId: {
            title: "Dénomination commune",
            advanced: true,
            entitySource: {
              id: "Id",
              name: "DenominationCommune",
              text: null,
              query: "/api/domain//",
              queryParameterName: "args"
            },
            type: ["string", "null"],
            default: null,
            format: "entityKey"
          },
          ConservationId: {
            title: "Conservation",
            advanced: true,
            entitySource: {
              id: "Id",
              name: "Conservation",
              text: null,
              query: "/api/domain//",
              queryParameterName: "args"
            },
            type: ["string", "null"],
            default: null,
            format: "entityKey"
          },
          MedicamentStatutId: {
            title: "Statut",
            advanced: true,
            entitySource: {
              id: "Id",
              name: "MedicamentStatut",
              text: null,
              query: "/api/domain//",
              queryParameterName: "args"
            },
            type: ["string", "null"],
            default: null,
            format: "entityKey"
          },
          PrepaHosp: {
            title: "Péparation Hospitalière",
            advanced: true,
            type: "boolean",
            default: false
          },
          LivretTherapeutique: {
            title: "Livret thérapeutique",
            advanced: true,
            type: "boolean",
            default: false
          },
          ColonnesToDisplay: {
            title: "Colonne",
            advanced: true,
            type: ["array", "null"],
            default: null,
            items: {
              title: "Colonne",
              advanced: true,
              enumNames: [
                "Marque",
                "Categorie",
                "Conservation",
                "TypeProduit",
                "DenominationCommune",
                "MedicamentStatut",
                "Quantite"
              ],
              enumDescriptions: [
                "Marque",
                "Catégorie",
                "Conservation",
                "Type de produits",
                "Dénomination commune",
                "Statut du médicament",
                "Quantité"
              ],
              type: "integer",
              format: "enum",
              enum: [0, 1, 2, 3, 4, 5, 6]
            }
          },
          Receptionnable: {
            title: "Produits réceptionnables",
            advanced: true,
            type: ["boolean", "null"],
            default: null
          },
          Commandable: {
            title: "Produits commandables",
            advanced: true,
            type: ["boolean", "null"],
            default: null
          }
        }
      },
      hasError: false,
      showError: false,
      dataS: {}
    };
  }

  render() {
    return (
      <UpThemeProvider theme={theme}>
        <>
          <JSONInput
            id="a_unique_id"
            placeholder={this.state.schema}
            locale={locale}
            theme="light_mitsuketa_tribute"
            colors={{
              string: "#DAA520" // overrides theme colors with whatever color value you want
            }}
            height="550px"
            onChange={this.onSchemaChange}
          />

          <UpSchemaForm
            initValue={{ size: this.state.nb }}
            showError={this.state.showError}
            schema={this.state.schema}
            onFormPayload={this.onFormPayload}
          />
        </>
      </UpThemeProvider>
    );
  }

  onEditorChange = e => {};

  onSchemaChange = value => {
    this.setState({ result: "", schema: value.jsObject });
  };
  onFormPayload = (e, hasError: boolean) => {
    this.setState({ dataS: e });
  };
}

ReactDOM.render(<Demo />, document.getElementById("root"));
