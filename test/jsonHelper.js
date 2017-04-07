import Reader from '../src/lib/Reader';
import JsonHelper from '../src/lib/JsonHelper';
import path from 'path';
import fs from 'fs';

let reader = new Reader("Hello!Duckdoc");

let dir = path.join(__dirname, './duckdoc/json');
// var arr = reader.readDir(dir);
var collection = reader.readDirToCollection(dir)

let jsonHelper = new JsonHelper(collection);
console.log("+++++ENDPOINST+++++");
console.log(jsonHelper.endpoints);
console.log("+++++MENU+++++");
console.log(jsonHelper.menu);