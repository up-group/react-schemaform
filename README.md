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

## Utilisation du composant

## autre