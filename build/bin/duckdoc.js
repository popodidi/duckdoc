#! /usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _nodeEmoji = require('node-emoji');

var _nodeEmoji2 = _interopRequireDefault(_nodeEmoji);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Duck = require('../lib/Duck');

var _Duck2 = _interopRequireDefault(_Duck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basePath = _lodash2.default.trim(process.cwd());
var jsonDir;
_commander2.default.option('-o, --output [outputPath]', 'Output destination, default to ./doc/').option('-p, --projectName [projectName]', 'Output destination, default to folder name').arguments('<jsonDir>').action(function (_jsonDir) {
  jsonDir = _path2.default.join(basePath, _jsonDir);
}).parse(process.argv);

var destPath;

if (_lodash2.default.isUndefined(_commander2.default.output)) {
  destPath = _path2.default.join(basePath, "doc");
} else {
  destPath = _path2.default.join(basePath, _commander2.default.output);
}

var projectName;

if (_lodash2.default.isUndefined(_commander2.default.projectName)) {
  projectName = _lodash2.default.last(_lodash2.default.split(jsonDir, '/'), 1);
} else {
  projectName = _commander2.default.projectName;
}
console.log(_chalk2.default.magenta.bold("  🦆   QUACK! QUACK! ") + _chalk2.default.bold("duckdoc is running ..."));
console.log("");
console.log(_chalk2.default.cyan.bold("  Project    : ") + _chalk2.default.blue('' + projectName));
console.log(_chalk2.default.cyan.bold("  JSON dir   : ") + _chalk2.default.blue('' + jsonDir));
console.log(_chalk2.default.cyan.bold("  Output dir : ") + _chalk2.default.blue('' + destPath));
console.log("");
var duck = new _Duck2.default(projectName, jsonDir, destPath);
duck.renderAll();