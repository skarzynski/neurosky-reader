const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const {homeRouter} = require('./routes/home');
const {apiRouter} = require('./routes/api');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.engine('.hbs', hbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/api', apiRouter);

app.listen(3000, 'localhost');
