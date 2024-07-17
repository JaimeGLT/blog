const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const taskRouter = require('./routes/task.routes');
const favoriteRouter = require('./routes/favorites.routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(morgan('dev'));

// Rutas
app.use('/api', userRouter);
app.use('/api', taskRouter);
app.use('/api', favoriteRouter);

module.exports = app;

