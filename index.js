const playJsExpress = require('play-js-express');
const server = new playJsExpress.Server(pjs);
server.init(require('./webpack.config.js'));
server.use('/char', require('./api/char-api'));
server.listen();
