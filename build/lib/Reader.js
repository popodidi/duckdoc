'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _filenamify = require('filenamify');

var _filenamify2 = _interopRequireDefault(_filenamify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Reader = function () {
  function Reader(projectName) {
    _classCallCheck(this, Reader);

    if (_lodash2.default.isString(projectName) && !_lodash2.default.isEmpty(projectName)) {
      this.projectName = projectName;
    } else {
      throw new Error("project name should be a non-empty string");
    }
  }

  _createClass(Reader, [{
    key: 'readDir',
    value: function readDir(dir) {
      var _this = this;

      return _lodash2.default.map(_fs2.default.readdirSync(dir), function (file) {
        if (_lodash2.default.endsWith(file, '.json')) {
          var o = require(_path2.default.join(dir, file));
          o.fileName = file;
          return o;
        } else {
          var obj = {};
          obj[file] = _this.readDir.bind(_this)(_path2.default.join(dir, file));
          return obj;
        }
      });
    }
  }, {
    key: 'readDirToCollection',
    value: function readDirToCollection(dir) {
      var _this2 = this;

      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.projectName;
      var namePrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

      var collection = {
        name: name,
        collections: [],
        endpoints: []
      };
      var arr = this.readDir(dir);
      _lodash2.default.forEach(arr, function (obj) {
        if (!_lodash2.default.isUndefined(obj.method)) {
          // is endpoint
          obj.method = _lodash2.default.toUpper(obj.method);
          var fileName = _lodash2.default.split(obj.fileName, '.json')[0];
          obj.fileName = namePrefix + '_' + _this2._safeName(fileName);
          obj.tasks = _lodash2.default.map(obj.tasks, function (t) {
            t.fileName = obj.fileName + '_task_' + _this2._safeName(t.name);
            return t;
          });
          obj.firstTask = _lodash2.default.head(_lodash2.default.get(obj, 'tasks'));
          collection.endpoints.push(obj);
        } else {
          // is folder
          var folderName = Object.keys(obj)[0];
          var c = _this2.readDirToCollection.bind(_this2)(_path2.default.join(dir, folderName), folderName, namePrefix + '_' + _this2._safeName(folderName));
          collection.collections.push(c);
        }
      });
      return collection;
    }
  }, {
    key: '_safeName',
    value: function _safeName(name) {
      return name.replace(/[^a-zA-Z0-9\_]/g, function (s) {
        var c = s.charCodeAt(0);
        if (c == 32) return '-';
        if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
        return '__' + ('000' + c.toString(16)).slice(-4);
      });
    }
  }]);

  return Reader;
}();

exports.default = Reader;
module.exports = exports['default'];