import _ from 'lodash';
import Reader from './Reader';
import JsonHelper from './JsonHelper';
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import nunjucks from 'nunjucks';

class Duck {
  constructor(projectName, dir, outputPath) {
    this.reader = new Reader(projectName);
    var collection = this.reader.readDirToCollection(dir);
    this.jsonHelper = new JsonHelper(collection);
    this.outputPath = outputPath;
  }

  _mkdirIfNecessary() {
    this.outputPath.split('/').forEach((dir, index, splits) => {
      const parent = splits.slice(0, index).join('/');
      const dirPath = path.resolve(parent, dir);
      if (!fs.existsSync(dirPath)) {

        fs.mkdirSync(dirPath);
      }
    });
  }

  _render(templatePath, data, fileName) {
    this._mkdirIfNecessary();
    let savePath = path.join(this.outputPath, fileName);
    nunjucks.render(templatePath, data, function (err, content) {
      if (err) {
        throw err;
      } else {
        fs.writeFileSync(savePath, content);
        console.log(chalk.green.bold("  Create : ") + chalk.blue(`${savePath}`));
      }
    });
  }

  renderIndex() {
    let templatePath = path.join(__dirname, `../../template/index.html`);
    let data = {
      menu    : this.jsonHelper.menu,
    };
    let fileName = 'index.html';
    this._render(templatePath, data, fileName)
  }

  renderEndpoints() {
    _.forEach(this.jsonHelper.endpoints, e => {
      let templatePath = path.join(__dirname, `../../template/endpoint.html`);
      let data = {
        menu    : this.jsonHelper.menu,
        result: e
      };
      let fileName = `${e.fileName}.html`;
      this._render(templatePath, data, fileName)
    })
  }

  _copy(origin, dest) {
    fse.copy(origin, dest, {overwrite: true}, err => {
      if (err) throw err
      console.log(chalk.yellow.bold("  Copy   : ") + chalk.blue(path.join(dest)));
    })
  }

  copyStyleFolders() {
    this._copy(path.join(__dirname, '../../template/css'), this.outputPath + "/css");
    this._copy(path.join(__dirname, '../../template/semantic'), this.outputPath + "/semantic");
  }

  renderAll() {
    this.renderIndex();
    this.renderEndpoints();
    this.copyStyleFolders();
  }
}

export default Duck
