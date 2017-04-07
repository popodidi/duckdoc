import Duck from '../src/lib/Duck';
import path from 'path';
import fs from 'fs';

let dir = path.join(__dirname, './duckdoc/json');
let outputPath = path.join(__dirname, './duckdoc/site');
let duck = new Duck("Hello!Duckdoc",dir, outputPath);

duck.renderAll();
