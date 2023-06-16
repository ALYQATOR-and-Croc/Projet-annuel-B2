import CreateError from 'http-errors';
import Express from 'express';
import * as path from 'path';
import CookieParser from 'cookie-parser';
import Logger from 'morgan';
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = Express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(Logger('dev'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(CookieParser());
app.use(Express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req: any, res: any, next: (arg0: CreateError.HttpError<404>) => void) {
  next(CreateError(404));
});

// error handler
app.use(function(err: { message: any; status: any; }, req: { app: { get: (arg0: string) => string; }; }, res: { locals: { message: any; error: any; }; status: (arg0: any) => void; render: (arg0: string) => void; }, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
