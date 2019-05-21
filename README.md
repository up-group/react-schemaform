# React-SchemaForm
 
 ## Instalation

 ``` javascript
 npm install @up-group/up-react-schemaform
 ```


 Ce projet a été testé et fonctionne avec l'usilisation de [WebPack](https://webpack.github.io/docs/)

 Exemple de webpack.config.js:
  ``` javascript
 module.exports = {
    entry: {
        'docs/dist/demo': './docs/demo.tsx'
    },
    output: {
        path: './',
        filename: '[name].js'
    }          ,
    devtool: "source-map",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            { test: /\.tsx?|.ts?$/, loader: "awesome-typescript-loader" },
        ],
    }
};
 ```

 ## Dependance

Les composants de ce projet provienne de [react-controls](https://github.com/Up-Group/react-controls) 

 ## Projet

 Ce projet a pour objectif la génération automatique d'un formulaire à partir d'un JsonSchema. 

 Site de référence :

- [Guide spacetelescope](https://spacetelescope.github.io/understanding-json-schema/)
- [json-schema.org](http://json-schema.org/)

  Il est a noté que si dans les grandes lignes les normes officiels du JsonSchema sont respecté, elles ont été adaptées pour répondre à nos besoin.

## demo

La demo suivante permet de de voir la generation.

[demo](https://up-group.github.io/react-schemaform/)

## JsonSchema

### Type


- object
- array
- string
- number
- integer
- boolean


### Format

- date
- date-time
- time
- entitykey
- enum
- email

### Required

Cette valeur est definie au niveau du parent pour dire qu'elle enfant sont requis.

``` javascript
{
    "type": "object",
    "properties": {
        "age": { "type": "number" }
        "hauteur": { "type": "number" }
    },
    "required": ["age"]
}
```

Dans cette exemple l'a valeur age est requise mais pas la hauteur.


### Minimum et Maximum

Disponible avec les types `number` et `integer`.

``` javascript
{
    "type":"number",
    "minimum":5.0,
    "maximum":10.5
}
```

### Enum

Cette partie ne suis pas les normes de JSONSchema.

Deux champs suplmentaire ont été rajouté :
- `enumNames`
- `enumDescriptions` 

Ainsi que le format :
- `enum`

Ce fonctionnement est orirenté specifiquement pour la génèration de formulaire.


```javascript
{
    "enumNames":["choix1","choix2","choix3"],
    "enumDescriptions":["Premier choix","Second choix","Troisieme choix"],
    "type":"integer",
    "format":"enum",
    "enum":[2,4,6]
}
```

### EntityKey EntitySource

Nouveau format `entityKey`

Nouveau propiete de JsonSchema: `entitySource` qui contient : 
- `id` : nom de la propriété qui sera renvoyé.
- `name` : nom de l’agrégat
- `text` : nom à afficher à l’utilisateur
- `query` : url de l’api de recherche
- `queryParameterName` : nom de l’argument

``` javascript
{
    "entitySource":{
        "id":"Id",
        "name":"Inventaire",
        "text":"{Nom}",
        "query":"/AtHome/api/queries/IInventaireSearchQuery",
        "queryParameterName":"args"
    },
    "type":"string",
    "default":"00000000-0000-0000-0000-000000000000",
    "format":"entityKey"
}

```

### Upload

Gestion d’upload de fichier, permet d’envoyer un fichier transformé en byte array.

Nouveau format `upload`
Nouvelle propiété JsonSchema `fileExtension`

```javascript
{
    "fileExtension":".csv",
    "type":["string","null"],
    "default":null,
    "format":"upload"
}
```

## Utilisation du composant

## Autre
