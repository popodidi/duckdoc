#! /usr/bin/env node

import command from 'commander';
import chalk from 'chalk';
import path from 'path';
import _ from 'lodash';
import Duck from '../lib/Duck';


var basePath = _.trim(process.cwd());
var jsonDir;
command
  .option('-o, --output [outputPath]', 'Output destination, default to ./doc/')
  .option('-o, --projectName [projectName]', 'Output destination, default to folder name')
  .arguments('<jsonDir>')
  .action(function (_jsonDir) {
    jsonDir = path.join(basePath, _jsonDir);
  })
  .parse(process.argv);

var destPath;

if (_.isUndefined(command.output)) {
  destPath = path.join(basePath, "doc");
} else {
  destPath = path.join(basePath, command.output);
}

var projectName;

if (_.isUndefined(command.projectName)) {
    projectName = _.last(_.split(jsonDir, '/'), 1);
} else {
    projectName = command.projectName;
}

console.log(projectName);
console.log(jsonDir);
console.log(destPath);
var duck = new Duck(projectName, jsonDir, destPath);
duck.renderAll();
