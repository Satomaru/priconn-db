const fs = require('fs');
const path = require('path');
const charPath = path.join(__dirname, '../data/char/');
const fileMatcher = /^(\d+)\.json$/;

function getAllIds() {
  return fs.readdirSync(charPath)
    .map((name) => fileMatcher.exec(name))
    .filter((result) => result !== null)
    .map((result) => result[1]);
}

class Char {

  static ids = getAllIds();

  static getAll() {
    return this.ids.map((id) => new Char(id));
  }

  static compare(char1, char2) {
    return (char1.data.name < char2.data.name) ? -1 : 1;
  }

  constructor(id) {
    const fileName = path.join(charPath, `${id}.json`);
    this.data = Object.assign({}, require(fileName));
    this.data.id = id;
  }
}

module.exports = Char;
