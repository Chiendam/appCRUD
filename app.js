const express = require('express');
const morgan = require('morgan');
var path = require('path');
const userRouter = require('./routers/userRouter');
const homeRouter = require('./routers/homeRouter');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/users/', userRouter);
app.use('/', homeRouter);


module.exports = app; 