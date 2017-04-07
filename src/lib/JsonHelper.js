import _ from 'lodash';

class JsonHelper {
  constructor(collection) {
    this.collection = collection;
  }

  get menu() {
    return this._toMenu(this.collection);
  }

  get endpoints() {
    return _.flattenDeep(this._toEndpointArr(this.collection));
  }

  _toEndpointArr(collection) {
    var endpoints = [];
    endpoints.push(collection.endpoints);
    endpoints.push(_.map(collection.collections, c => {
      return this._toEndpointArr.bind(this)(c);
    }))
    return endpoints;
  }

  _toMenu(collection) {
    return {
      name       : collection.name,
      collections: _.map(collection.collections, c => {
        return this._toMenu.bind(this)(c);
      }),
      endpoints  : _.map(collection.endpoints, e => {
        return _.pick(e, ['method', 'url', 'fileName']);
      })
    }
  }
}

export default JsonHelper;