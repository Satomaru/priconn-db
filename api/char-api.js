const router = require('express').Router();
const Char = require('./char');

router.get('/', (request, response) => {
  const chars = Char.getAll();
  chars.sort(Char.compare);
  response.json(chars.map(char => char.data));
});

router.get('/:id(\\d+)', (request, response) => {
  response.json(new Char(request.params.id).data);
});

router.post('/search', (request, response) => {
  const chars = [];
  const condition = request.body;

  for (const id of Char.ids) {
    const char = new Char(id);
    const data = char.data;

    if (condition.name && data.name.indexOf(condition.name) === -1) {
      continue;
    }

    chars.push(char);
  }

  chars.sort(Char.compare);
  response.json(chars.map(char => char.data));
});

module.exports = router;
