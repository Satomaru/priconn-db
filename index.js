const playJsReactExpress = require('play-js-react-express');
const server = new playJsReactExpress.Server(pjs);

server.init();
server.use('/char', require('./api/char-api'));
server.listen();
