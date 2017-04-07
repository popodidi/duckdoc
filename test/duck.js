import duckdoc from '../build/index';
import path from 'path';
import fs from 'fs';

let dir = path.join(__dirname, './duckdoc/json');
let outputPath = path.join(__dirname, './duckdoc/site');
let duck = duckdoc("Hello!Duckdoc",dir, outputPath);

duck.renderAll();
