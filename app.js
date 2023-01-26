const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const pageRoute = require('./routes/pageRouter');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

// connect db
mongoose.set('strictQuery', false);
mongoose
    .connect('mongodb://127.0.0.1:27017/smartedu-db')
    .then(() => console.log('db connected!'));

// template engine
app.set('view engine', 'ejs');

// global veriable
global.userIN = null;

// middleware
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
    session({
        secret: 'my_keyboard_cat',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: 'mongodb://127.0.0.1:27017/smartedu-db',
        }),
    })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessage = req.flash();
    next();
});

// routes
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});
