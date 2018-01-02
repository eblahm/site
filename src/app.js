
const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const _ = require('lodash');
const morgan = require('morgan');
const ejs = require('ejs');

const app = express();

app.use(morgan(config.log.morgan));

app.use(express.static(config.publicBuildDir));

app.use(bodyParser.json());

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', `${__dirname}/views`);

app.get('/', (req, res, next) => {
  res.render('index');
});

app.use((req, res, next) => {
  next(_.assign(new Error('not found'), { status: 404 }));
});

app.use((err, req, res, next) => {
  if (err.message === 'EmptyResponse') {
    err.status = 404;
  }

  console.error(err.stack);
  const status = err.status || 500;
  res.status(status);
  res.json({
    name: err.name,
    message: err.message,
    status
  });
});

module.exports = app;
