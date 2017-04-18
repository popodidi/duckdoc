import _ from 'lodash';
import Reader from './Reader';
import JsonHelper from './JsonHelper';
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import nunjucks from 'nunjucks';

class Duck {
  constructor(projectName, dir, outputPath, templatePath) {
    this.reader = new Reader(projectName);
    var collection = this.reader.readDirToCollection(dir);
    this.jsonHelper = new JsonHelper(collection);
    this.outputPath = outputPath;
    if (_.isUndefined(templatePath)) {
      this.templatePath = path.join(__dirname, '../../template/duck');
    } else {
      this.templatePath = templatePath;
    }
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
    let template = fs.readFileSync(templatePath).toString();
    // nunjucks.render(templatePath, data, function (err, content) {
    //   if (err) {
    //     throw err;
    //   } else {
    //     fs.writeFileSync(savePath, content);
    //     console.log(chalk.green.bold("  Create : ") + chalk.blue(`${savePath}`));
    //   }
    // });
    nunjucks.renderString(template, data, function (err, content) {
      if (err) {
        throw err;
      } else {
        fs.writeFileSync(savePath, content);
        console.log(chalk.green.bold("  Create : ") + chalk.blue(`${savePath}`));
      }
    });
  }

  renderIndex() {
    // let templatePath = path.join(__dirname, `../../template/index.html`);
    let templateFilePath = path.join(this.templatePath, 'index.html');
    let data = {
      menu    : this.jsonHelper.menu,
    };
    let fileName = 'index.html';
    this._render(templateFilePath, data, fileName)
  }

  renderEndpoints() {
    _.forEach(this.jsonHelper.endpoints, e => {
      // let templatePath = path.join(__dirname, `../../template/endpoint.html`);
      let templateFilePath = path.join(this.templatePath, 'content-endpoint.html');
      let data = {
        menu    : this.jsonHelper.menu,
        result: e
      };
      let fileName = `${e.fileName}.html`;
      this._render(templateFilePath, data, fileName)
    })
  }

  _copy(origin, dest) {
    fse.copy(origin, dest, {overwrite: true}, err => {
      if (err) throw err
      console.log(chalk.yellow.bold("  Copy   : ") + chalk.blue(path.join(dest)));
    })
  }

  copyStyleFolders() {
    this._copy(path.join(this.templatePath, 'style'), this.outputPath + "/style");

    // this._copy(path.join(__dirname, '../../template/css'), this.outputPath + "/css");
    // this._copy(path.join(__dirname, '../../template/semantic'), this.outputPath + "/semantic");
  }

  renderAll() {
    this.renderIndex();
    this.renderEndpoints();
    this.copyStyleFolders();
  }
}

export default Duck
