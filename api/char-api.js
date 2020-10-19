const router = require('express').Router();
const Char = require('./char');
const Matcher = require('./matcher');

router.get('/', (request, response) => {
  const chars = Char.getAll();
  chars.sort(Char.compareByName);
  response.json(chars.map((char) => char.data));
});

router.get('/:id(\\d+)', (request, response) => {
  response.json(new Char(request.params.id).data);
});

router.post('/search', (request, response) => {
  const chars = [];

  for (const id of Char.ids) {
    const char = new Char(id);

    new Matcher(char.data)
      .contains('name', request.body.name)
      .ifMatched(() => chars.push(char));
  }

  chars.sort(Char.compareByName);
  response.json(chars.map((char) => char.data));
});

module.exports = router;
