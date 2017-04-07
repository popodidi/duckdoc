import Duck from '../src/lib/Duck';
import path from 'path';
import fs from 'fs';

let dir = path.join(__dirname, './duckdoc/json');
let outputPath = path.join(__dirname, './duckdoc/site');

let duck = new Duck("Hello!Duckdoc",dir, outputPath);

fs.writeFile(path.join(__dirname, './duckdoc/site', 'menu.json'), JSON.stringify(duck.jsonHelper.menu));

duck.renderIndex();
duck.renderEndpoints();
duck.copyStyleFolders();