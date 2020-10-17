const fs = require('fs');
const charPath = '/data/char/';

function listCharFiles() {
  return fs.readdirSync(__dirname + charPath)
    .filter(title => title.endsWith('.json'))
    .map(title => '.' + charPath + title);
}

function getCharFile(id) {
  return `.${charPath}${id}.json`;
}

function sortChars(array) {
  array.sort((left, right) => (left.name < right.name) ? -1 : 1);
}

module.exports.getAllChars = function() {
  const files = listCharFiles();
  const chars = files.map(require);
  sortChars(chars);
  return chars;
};

module.exports.getChar = function(id) {
  return require(getCharFile(id));
};

module.exports.searchChar = function(condition) {
  const result = [];
  const files = listCharFiles();

  for (const file of files) {
    const char = require(file);

    if (condition.name && char.name.indexOf(condition.name) === -1) {
      continue;
    }

    result.push(char);
  }

  return result;
}
