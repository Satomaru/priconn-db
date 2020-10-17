const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const charPath = path.join(__dirname, '../data/char/');

// キャラクターデータファイルの一覧を取得します。
function listCharFiles() {
  return fs.readdirSync(charPath)
    .filter(title => title.endsWith('.json'))
    .map(title => path.join(charPath, title));
}

// キャラクターデータファイルを取得します。
function getCharFile(id) {
  return path.join(charPath, `${id}.json`);
}

// キャラクターデータ配列をソートします。
function sortChars(array) {
  array.sort((left, right) => (left.name < right.name) ? -1 : 1);
}

// ルーティング：キャラクターデータを全件取得します。
router.get('/', (request, response) => {
  const chars = listCharFiles().map(require);
  sortChars(chars);
  response.json(chars);
});

// ルーティング：指定されたIDのキャラクターデータを取得します。
router.get('/:id(\\d+)', (request, response) => {
  response.json(require(getCharFile(request.params.id)));
});

// ルーティング：キャラクターデータを検索します。
router.post('/search', (request, response) => {
  const chars = [];
  const files = listCharFiles();
  const condition = request.body;

  for (const file of files) {
    const char = require(file);

    if (condition.name && char.name.indexOf(condition.name) === -1) {
      continue;
    }

    chars.push(char);
  }

  sortChars(chars);
  response.json(chars);
});

module.exports = router;
