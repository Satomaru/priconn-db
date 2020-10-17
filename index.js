const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const multipart = require('connect-multiparty');
const app = express();
const port = process.env['REACT_APP_PORT'];
const compiler = webpack(config);

const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  serverSideRender: false,
  watchOptions: {
    ignored: /.*/
  }
});

const api = require('./api');

app.use(middleware);
app.use(multipart());
app.get('/',               (req, res) => res.sendFile('index.html', { root: __dirname }));

app.get('/char',           (req, res) => res.json(api.getAllChars()));
app.get('/char/:id(\\d+)', (req, res) => res.json(api.getChar(req.params.id)));
app.post('/char/search',   (req, res) => res.json(api.searchChar(req.body)));

app.listen(port, () => console.log(`Launching app... http://localhost:${port}\n`));

try {
  pjs.register(app, middleware);
} catch (error) {}
