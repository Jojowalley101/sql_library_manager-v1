'use strict'

//var app = require('../app');
var createError = require('http-errors');
var sequelize = require('./models').sequelize;


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/books', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log('404 error handler called');
  res.status(404).render('page-not-found')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// /* ERROR HANDLERS */

// /* 404 handler to catch undefined or non-existent route requests */
// app.use((req, res, next) => {

//   console.log('404 error handler called');

//   /* TODO 1: Send a response to the client
//     - Set the response status to 404
//     - Render the 'not-found' view
//   */
//   res.status(404).render('page-not-found');
// });

// /* Global error handler */
// app.use((err, req, res, next) => {

//   if (err) {
//     console.log('Global error handler called', err);
//   }

//   /* TODO 2: Handle errors caught by your route handlers
//     - If the error status is 404:
//         * Set the response status to 404
//         * Render the 'not-found' view and pass the error object to the view
//     - Else:
//         * Set the error message to the given message, or specify a general, 
//           default error message
//         * Set response status to the given error status OR, set it to 500 by default if no error status is set
//         * Render the 'error' view, passing it the error object
//   */
//   if (err.status === 404) {
//     res.status(404).render('page-not-found', { err });
//   } else {
//     err.message = err.message || `Oops!  It looks like something went wrong on the server.`;
//     res.status(err.status || 500).render('error', { err });
//   }
// });

(async () => {
  try {
    //authenticate used to test connection to data base
    await sequelize.authenticate();
    console.log('Connection to database successful!');
  } catch (error) {
    console.error('Error connecting to database: ', error);
  }
})();




module.exports = app;
