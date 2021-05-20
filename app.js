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
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

// // Handle 404
// app.use(function (req, res) {
//   res.status(400);
//   res.render('404.jade', { title: '404: File Not Found' });
// });

// // Handle 500
// app.use(function (error, req, res, next) {
//   res.status(500);
//   res.render('500.jade', { title: '500: Internal Server Error', error: error });
// });

// catch 404 and forward to error handler
// 

// error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// /* ERROR HANDLERS */

// /* 404 handler to catch undefined or non-existent route requests */
// app.use((req, res, next) => {

//   console.log('404 error handler called');

// //   /* TODO 1: Send a response to the client
// //     - Set the response status to 404
// //     - Render the 'not-found' view
// //   */
//   res.status(404).render('page-not-found');
// });
app.use(function(req, res) {

  console.log('404 error handler called');

  //   /* TODO 1: Send a response to the client
  //     - Set the response status to 404
  //     - Render the 'not-found' view
  //   */
  res.status(404);
  res.render('page-not-found');
});

app.use(function(error, req, res, next) {

  console.log('500 error handler called');

  //   /* TODO 1: Send a response to the client
  //     - Set the response status to 404
  //     - Render the 'not-found' view
  //   */
  res.status(500);
  res.render('error');
});

/* Global error handler */
// app.use((err, req, res, next) => {

//   if (err) {
//     console.log('Global error handler called', err);

// //   /* TODO 2: Handle errors caught by your route handlers
// //     - If the error status is 404:
// //         * Set the response status to 404
// //         * Render the 'not-found' view and pass the error object to the view
// //     - Else:
// //         * Set the error message to the given message, or specify a general, 
// //           default error message
// //         * Set response status to the given error status OR, set it to 500 by default if no error status is set
// //         * Render the 'error' view, passing it the error object
// //   */
  
//     err.message = err.message || `Oops!  It looks like something went wrong on the server.`;
//     res.status(err.status || 500).render('error', { err });
//   } else {
//     console.log('heyyyyppp')
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


/**
 * @source https://stackoverflow.com/questions/36113101/handling-404-500-and-exceptions-in-node-js-and-express
 */
// error handlers - these take err object.
// these are per request error handlers.  They have two so in dev
// you get a full stack trace.  In prod, first is never setup

// development error handler
// will print stacktrace
// catch 404 and forward to error handler
// note this is after all good routes and is not an error handler
// to get a 404, it has to fall through to this route - no error involved

// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// if (app.get('env') === 'development') {
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });




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