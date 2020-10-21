const router = require('express').Router();
const apiUtils = require('./api-utils');
const Char = require('./char');
const Matcher = require('./matcher');

router.get('/', (request, response) => {
  console.log('\nrequest: char-api/list');
  const chars = Char.getAll();
  chars.sort(Char.compareByName);
  response.json(chars.map((char) => char.data));
});

router.get('/:id([a-z]+|[a-z]+-[a-z]{2})', (request, response) => {
  console.log('\nrequest: char-api/get', request.params.id);
  response.json(new Char(request.params.id).data);
});

router.post('/search', (request, response) => {
  console.log('\nrequest: char-api/search', request.body);
  const chars = [];
  const skill = request.body.skillgroup && (request.body.skill || []);

  for (const id of Char.ids) {
    const char = new Char(id);

    new Matcher()
      .includes(char.data.name, request.body.name)
      .equalsNumber(char.data.position, request.body.position)
      .containsOneOf(char.data.skill[request.body.skillgroup], skill)
      .ifMatched(() => chars.push(char));
  }

  chars.sort(Char.compareByName);
  response.json(chars.map((char) => char.data));
});

module.exports = router;
