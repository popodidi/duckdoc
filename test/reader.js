import Reader from '../src/lib/Reader';
import path from 'path';
import fs from 'fs';

let reader = new Reader("Hello!Duckdoc");

let dir = path.join(__dirname, './duckdoc/json');
// var arr = reader.readDir(dir);
var collection = reader.readDirToCollection(dir)
