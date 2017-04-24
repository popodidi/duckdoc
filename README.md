# duckdoc 🦆

[![NPM version](https://img.shields.io/npm/v/duckdoc.svg?style=flat-square)](https://npmjs.org/package/duckdoc)

duckdoc is a REST API documentation tool, consisting of duckdoc and [duckdoc-jsoner][duckdoc-jsoner].


Integrating [duckdoc-jsoner][duckdoc-jsoner] within the testing process and prepares `.json` files of each endpoint based on tests of each endpoint. duckdoc then parses those files and renders to static document sites (i.e., `.html`).

## motivation

REST API documentation is always a bunch of trivia. Especially when the project is under development and the API is evolving every build, the complaints of inconsistency between document and realistic from frontend / mobile teammates are endless.

duckdoc aims to solve this problem. Integrating documentation within the testing process ensures the correction of request and response of each endpoint.


## demo

- [Demo](http://social-worker-implements-35227.netlify.com)
- [Tutorial](https://popodidi.haostudio.cc/post/duckdoc-rest-api-documentation/)

## prerequisite

prepare `.json` with [duckdoc-jsoner](https://github.com/popodidi/duckdoc-jsoner).

## compatibility

duckdoc | duckdoc-jsoner
--- | ---
0.10.x | 0.7.x
0.11.x | 0.8.x

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
    -p, --projectName [projectName]  Output destination, default to folder name


```

### Example

```
$ duckdoc --projectName hello-duckdoc --output ./doc path/to/json/folder 
```

### code

```js
var duckdoc = require('duckdoc');
var duck = duckdoc("projectName", "path/to/json/folder", "/output/path");
duck.renderAll();

```


[duckdoc-jsoner]: https://github.com/popodidi/duckdoc-jsoner