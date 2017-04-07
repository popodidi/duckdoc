# duckdoc
[![NPM version](https://img.shields.io/npm/v/duckdoc.svg?style=flat-square)](https://npmjs.org/package/duckdoc)

duckdoc generate static api docmentation site from `.json`  file generated from [duckdoc-jsoner](https://github.com/popodidi/duckdoc-jsoner).

## prerequisite

prepare `.json` with [duckdoc-jsoner](https://github.com/popodidi/duckdoc-jsoner).

## install


```
$ npm install --save-dev duckdoc
```

or install globally

```
$ npm install -g duckdoc
```

## usage

### cli

```
$ duckdoc -h

  Usage: duckdoc [options] <jsonDir>

  Options:

    -h, --help                       output usage information
    -o, --output [outputPath]        Output destination, default to ./doc/
    -o, --projectName [projectName]  Output destination, default to folder name


```

**example**

```
$ duckdoc --projectName hello-duckdoc --output ./doc path/to/json/folder 
```

### code

```js
var duckdoc = require('duckdoc').default;
var duck = duckdoc("projectName", "path/to/json/folder", "/output/path");
duck.renderAll();

```