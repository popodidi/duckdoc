'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Reader = require('./Reader');

var _Reader2 = _interopRequireDefault(_Reader);

var _JsonHelper = require('./JsonHelper');

var _JsonHelper2 = _interopRequireDefault(_JsonHelper);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Duck = function () {
  function Duck(projectName, dir, outputPath) {
    _classCallCheck(this, Duck);

    this.reader = new _Reader2.default(projectName);
    var collection = this.reader.readDirToCollection(dir);
    this.jsonHelper = new _JsonHelper2.default(collection);
    this.outputPath = outputPath;
  }

  _createClass(Duck, [{
    key: '_mkdirIfNecessary',
    value: function _mkdirIfNecessary() {
      this.outputPath.split('/').forEach(function (dir, index, splits) {
        var parent = splits.slice(0, index).join('/');
        var dirPath = _path2.default.resolve(parent, dir);
        if (!_fs2.default.existsSync(dirPath)) {
          _fs2.default.mkdirSync(dirPath);
        }
      });
    }
  }, {
    key: '_render',
    value: function _render(templatePath, data, fileName) {
      this._mkdirIfNecessary();
      var savePath = _path2.default.join(this.outputPath, fileName);
      _nunjucks2.default.render(templatePath, data, function (err, content) {
        if (err) {
          throw err;
        } else {
          _fs2.default.writeFileSync(savePath, content);
          console.log(_chalk2.default.green.bold("  Create: ") + _chalk2.default.blue('' + savePath));
        }
      });
    }
  }, {
    key: 'renderIndex',
    value: function renderIndex() {
      var templatePath = _path2.default.join(__dirname, '../../template/index.html');
      var data = {
        menu: this.jsonHelper.menu
      };
      var fileName = 'index.html';
      this._render(templatePath, data, fileName);
    }
  }, {
    key: 'renderEndpoints',
    value: function renderEndpoints() {
      var _this = this;

      _lodash2.default.forEach(this.jsonHelper.endpoints, function (e) {
        var templatePath = _path2.default.join(__dirname, '../../template/endpoint.html');
        var data = {
          menu: _this.jsonHelper.menu,
          result: e
        };
        var fileName = e.fileName + '.html';
        _this._render(templatePath, data, fileName);
      });
    }
  }, {
    key: '_copy',
    value: function _copy(origin, dest) {
      _fsExtra2.default.copy(origin, dest, { overwrite: true }, function (err) {
        if (err) throw err;
        console.log(_chalk2.default.yellow.bold("  Copy : ") + _chalk2.default.blue(_path2.default.join(dest)));
      });
    }
  }, {
    key: 'copyStyleFolders',
    value: function copyStyleFolders() {
      this._copy(_path2.default.join(__dirname, '../../template/css'), this.outputPath + "/css");
      this._copy(_path2.default.join(__dirname, '../../template/semantic'), this.outputPath + "/semantic");
    }
  }, {
    key: 'renderAll',
    value: function renderAll() {
      this.renderIndex();
      this.renderEndpoints();
      this.copyStyleFolders();
    }
  }]);

  return Duck;
}();

exports.default = Duck;