const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRouter');
const courseRoute = require('./routes/courseRoute');

const app = express();

// connect db
mongoose.set('strictQuery', false);
mongoose
    .connect('mongodb://127.0.0.1:27017/smartedu-db')
    .then(() => console.log('db connected!'));

// template engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});
