import fs from 'fs'
import path from 'path';
import _ from 'lodash';

class Reader {
  constructor(projectName) {
    if (_.isString(projectName) && !_.isEmpty(projectName)) {
      this.projectName = projectName;
    } else {
      throw new Error("project name should be a non-empty string")
    }
  }

  readDir(dir) {
    return _.map(fs.readdirSync(dir), file => {
      if (_.endsWith(file, '.json')) {
        var o = require(path.join(dir, file));
        o.fileName = file;
        return o
      } else {
        var obj = {};
        obj[file] = this.readDir.bind(this)(path.join(dir, file));
        return obj;
      }
    })
  }

  readDirToCollection(dir, name = this.projectName, namePrefix = "") {
    var collection = {
      name,
      collections: [],
      endpoints  : []
    };
    var arr = this.readDir(dir)
    _.forEach(arr, obj => {
      if (!_.isUndefined(obj.method)) {
        // is endpoint
        let fileName = _.split(obj.fileName, '.json')[0];
        obj.fileName = `${namePrefix}_${fileName}`;
        obj.tasks = _.map(obj.tasks, t => {
          t.fileName = `${obj.fileName}_task_${t.name}`;
          return t
        })
        obj.firstTask = _.head(_.get(obj, 'tasks'));
        collection.endpoints.push(obj);
      } else {
        // is folder
        let folderName = Object.keys(obj)[0];
        let c = this.readDirToCollection.bind(this)(path.join(dir, folderName), folderName, `${namePrefix}_${folderName}`);
        collection.collections.push(c);
      }
    });
    return collection;
  }


}

export default Reader;