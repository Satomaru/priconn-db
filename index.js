const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const multipart = require('connect-multiparty');
const config = require('./webpack.config.js');

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

app.use(middleware);
app.use(multipart());
app.use(express.static('public'));
app.use('/char', require('./api/char'));
app.listen(port, () => console.log(`Launching... http://localhost:${port}\n`));

try {
  pjs.register(app, middleware);
} catch (error) {}
