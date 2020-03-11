import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import indexRouter from './routes/index';

const validDomains = ['\\localhost\\.test\\.com$', '\\localhost:'];
const validDomainsRegex = validDomains.map(domain => new RegExp(domain));

// initialize configuration
dotenv.config();

let app = express();

const port = process.env.SERVER_PORT || 8080;

//connect to the database
mongoose.connect(process.env.DB, {
  useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
})
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));
//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;
// add express middleware and csrf headers
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, 'public')));
} else {
  app.use(express.static(path.join(__dirname, 'build')))
}
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// add Cors Options
app.use(cors({
  origin: validDomainsRegex
}));
// define a route handler for the default home page
app.get('/*', (req, res) => {
  // render the index template
  // res.render('index');
  if (process.env.NODE_ENV === 'development') {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  } else {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  }
});
// api router
app.use('/api', indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use((err, req, res, next) => {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});

export default app;