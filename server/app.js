const createError = require('http-errors');
const express = require('express');
const { json, urlencoded } = require('express');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const pingRouter = require('./routes/ping');

const app = express();

if (process.env.hasOwnProperty('NODE_ENV') && process.env.NODE_ENV !== 'test') {
  const LoggerMiddleware = (req, res, next) => {
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`);
    next();
  };
  app.use(LoggerMiddleware);

  app.use(logger('dev'));
}

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/ping', pingRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});


module.exports = app;


