const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const charPath = path.join(__dirname, '../data/char/');

const charFiles = fs.readdirSync(charPath)
  .filter((title) => title.endsWith('.json'))
  .map((title) => path.join(charPath, title));

function compareChars(char1, char2) {
  return (char1.name < char2.name) ? -1 : 1;
}

function getCharFile(id) {
  return path.join(charPath, `${id}.json`);
}

router.get('/', (request, response) => {
  const chars = charFiles.map(require);
  chars.sort(compareChars);
  response.json(chars);
});

router.get('/:id(\\d+)', (request, response) => {
  response.json(require(getCharFile(request.params.id)));
});

router.post('/search', (request, response) => {
  const chars = [];
  const condition = request.body;

  for (const file of charFiles) {
    const char = require(file);

    if (condition.name && char.name.indexOf(condition.name) === -1) {
      continue;
    }

    chars.push(char);
  }

  chars.sort(compareChars);
  response.json(chars);
});

module.exports = router;
