const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const foodItemRoutes = require('./routes/admin/fooditems');
const categoryRoutes = require('./routes/admin/categories');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/fooditems', foodItemRoutes);
app.use('/admin/categories', categoryRoutes);
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

module.exports = app;
