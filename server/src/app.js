const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.routes');
const taskRouter = require('./routes/task.routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Rutas
app.use('/api', userRouter);
app.use('/api', taskRouter);

module.exports = app;

