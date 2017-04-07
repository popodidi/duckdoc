'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = duck;

var _Duck = require('./lib/Duck');

var _Duck2 = _interopRequireDefault(_Duck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function duck(projectName, dir, outputPath) {
  return new _Duck2.default(projectName, dir, outputPath);
}