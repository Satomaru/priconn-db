const fs = require('fs');
const path = require('path');
const playJsUtils = require('play-js-utils');
const charOrderList = require('../data/char/order.json');
const charPath = path.join(__dirname, '../data/char/');
const charFileMatcher = /^-([a-z]+(-[a-z]{2})?)\.json$/;

const charIds = fs.readdirSync(charPath)
  .map((name) => charFileMatcher.exec(name))
  .filter((result) => result !== null)
  .map((result) => result[1]);

class Char {

  static ids = charIds.slice();

  static getAll() {
    return this.ids.map((id) => new Char(id));
  }

  static compareByName(char1, char2) {
    return playJsUtils.compare(char1.data.name, char2.data.name);
  }

  constructor(id) {
    if (!charIds.includes(id)) {
      throw new Error(`illegal id: ${id}`);
    }

    const fileName = path.join(charPath, `-${id}.json`);
    this.data = Object.assign({}, require(fileName).general);
    this.data.id = id;
    const order = charOrderList.indexOf(this.data.name);
    this.data.order = (order !== -1) ? order + 1 : null;
  }
}

module.exports = Char;
