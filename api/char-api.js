const playJsExpress = require('play-js-express');
const router = playJsExpress.Router();
const Char = require('./char');

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
  const condition = request.body;
  const skill = condition.skillgroup && (condition.skill || []);

  for (const id of Char.ids) {
    const char = new Char(id);

    new playJsExpress.Matcher()
      .includes(char.data.name, condition.name)
      .equalsNumber(char.data.position, condition.position)
      .containsOneOf(char.data.skill[condition.skillgroup], skill)
      .ifMatched(() => chars.push(char));
  }

  chars.sort(Char.compareByName);
  response.json(chars.map((char) => char.data));
});

module.exports = router;
