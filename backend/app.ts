import CreateError from 'http-errors';
import Express from 'express';
import * as path from 'path';
import CookieParser from 'cookie-parser';
import Logger from 'morgan';
// import {indexRouter} from'./routes/index';

import { UsersRouter}  from './routes/users';
const usersRouter : UsersRouter = new UsersRouter(null);
// import { IndexRouter } from './routes/index';
// const indexRouter = new IndexRouter();

const app = Express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(Logger('dev')); 
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(CookieParser());
app.use(Express.static(path.join(__dirname, 'public')));

app.use('/');
app.use('/users', usersRouter.getRouter());

// catch 404 and forward to error handler
app.use(
  (req: any, res: any, next: (arg0: CreateError.HttpError<404>) => void) => {
    next(CreateError(404));
  }
);

// error handler
app.use(
  (
    err: { message: any; status: any },
    req: { app: { get: (arg0: string) => string } },
    res: {
      locals: { message: any; error: any };
      status: (arg0: any) => void;
      render: (arg0: string) => void;
    },
    next: any
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
);

export class App {
  private parameter : null
  constructor(parameter : null = null){
    this.parameter = parameter;
  }
  public get app(): any {
    return app;
  }
}
module.exports = app;
export function set(arg0: string, port: string | number | boolean) {
  throw new Error('Function not implemented.');
}
