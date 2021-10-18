const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const {readdir} = require('fs').promises;

const {apiRouter} = require('./routes/api');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.engine('.hbs', hbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/api', apiRouter);

app
    .get('/', async (req, res) => {
        const files = await readdir('data');
        console.log(files);
        res.render('home', {
            files,
        });
    });

app.listen(3000, 'localhost');
