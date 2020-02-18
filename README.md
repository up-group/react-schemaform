# React-SchemaForm
 
 ## Setup

 ``` javascript
 npm install @up-group/up-react-schemaform
 ```

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

 ## Dependency

Components : [react-controls](https://github.com/Up-Group/react-controls) 

 ## Project

 Ce projet a pour objectif la génération automatique d'un formulaire à partir d'un JsonSchema. 

 Site de référence :

- [Guide spacetelescope](https://spacetelescope.github.io/understanding-json-schema/)
- [json-schema.org](http://json-schema.org/)

  Il est à noter que si dans les grandes lignes les normes officielles du JsonSchema sont respectées, elles ont été adaptées pour répondre au besoin.

## Demo

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


### Minimum et Maximum

Disponible avec les types `number` et `integer`.

``` javascript
{
    "type":"number",
    "minimum":5.0,
    "maximum":10.5
}
```

### Enum (custom JSONShcema)

Deux champs supplémentaires ont été ajoutés :
- `enumNames`
- `enumDescriptions` 

Ainsi que le format :
- `enum`

```javascript
{
    "enumNames":["choix1","choix2","choix3"],
    "enumDescriptions":["Premier choix","Second choix","Troisieme choix"],
    "type":"integer",
    "format":"enum",
    "enum":[2,4,6]
}
```

### EntityKey / EntitySource

Nouveau format : `entityKey`

Nouvel propriété : `entitySource` qui contient : 
- `id` : nom de la propriété "clé" des objets retours
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
        "query":"/Product/api/queries/IInventaireSearchQuery",
        "queryParameterName":"args"
    },
    "type":"string",
    "default":"00000000-0000-0000-0000-000000000000",
    "format":"entityKey"
}

```

### Upload

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
