import fs from 'fs'
import path from 'path';
import _ from 'lodash';
import filenamify from 'filenamify';

class Reader {
  constructor(projectName) {
    if (_.isString(projectName) && !_.isEmpty(projectName)) {
      this.projectName = projectName;
    } else {
      throw new Error("project name should be a non-empty string")
    }
  }

  readDir(dir) {
    return _.filter(_.map(fs.readdirSync(dir), file => {
      var fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        // is folder
        var obj = {};
        obj[file] = this.readDir.bind(this)(path.join(dir, file));
        return obj;
      } else if (_.endsWith(file, '.json')) {
        // is .json
        var o = require(path.join(dir, file));
        o.fileName = file;
        return o
      } else {
        // others
        return undefined
      }
    }), o => {
      return !_.isUndefined(o);
    })
  }

  readDirToCollection(dir, name = this.projectName, namePrefix = "") {
    var collection = {
      name,
      id         : "",
      collections: [],
      endpoints  : []
    };
    var arr = this.readDir(dir)
    _.forEach(arr, obj => {
      if (!_.isUndefined(obj.method)) {
        // is endpoint
        obj.method = _.toUpper(obj.method);
        let fileName = _.split(obj.fileName, '.json')[0];
        obj.fileName = `${namePrefix}_${this._safeName(fileName)}`;
        obj.tasks = _.map(obj.tasks, t => {
          t.fileName = `${obj.fileName}_task_${this._safeName(t.name)}`;
          return t
        })
        obj.firstTask = _.head(_.get(obj, 'tasks'));
        collection.endpoints.push(obj);
      } else {
        // is folder
        let folderName = Object.keys(obj)[0];
        let c = this.readDirToCollection.bind(this)(path.join(dir, folderName), folderName, `${namePrefix}_${this._safeName(folderName)}`);
        c['id'] = `${namePrefix}_${this._safeName(folderName)}`;
        collection.collections.push(c);
      }
    });
    return collection;
  }

  _safeName(name) {
    return name.replace(/[^a-zA-Z0-9\_]/g, function (s) {
      var c = s.charCodeAt(0);
      if (c == 32) return '-';
      if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
      return '__' + ('000' + c.toString(16)).slice(-4);
    });
  }

}

export default Reader;