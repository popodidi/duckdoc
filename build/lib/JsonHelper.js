'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsonHelper = function () {
  function JsonHelper(collection) {
    _classCallCheck(this, JsonHelper);

    this.collection = collection;
  }

  _createClass(JsonHelper, [{
    key: '_toEndpointArr',
    value: function _toEndpointArr(collection) {
      var _this = this;

      var endpoints = [];
      endpoints.push(collection.endpoints);
      endpoints.push(_lodash2.default.map(collection.collections, function (c) {
        return _this._toEndpointArr.bind(_this)(c);
      }));
      return endpoints;
    }
  }, {
    key: '_toMenu',
    value: function _toMenu(collection) {
      var _this2 = this;

      return {
        name: collection.name,
        collections: _lodash2.default.map(collection.collections, function (c) {
          return _this2._toMenu.bind(_this2)(c);
        }),
        endpoints: _lodash2.default.map(collection.endpoints, function (e) {
          return _lodash2.default.pick(e, ['method', 'url', 'fileName']);
        })
      };
    }
  }, {
    key: 'menu',
    get: function get() {
      return this._toMenu(this.collection);
    }
  }, {
    key: 'endpoints',
    get: function get() {
      return _lodash2.default.flattenDeep(this._toEndpointArr(this.collection));
    }
  }]);

  return JsonHelper;
}();

exports.default = JsonHelper;