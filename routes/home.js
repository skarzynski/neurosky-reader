const express = require('express');
const {readdir} = require('fs').promises;

const homeRouter = express.Router();

homeRouter
    .get('/', async (req, res) => {
        const files = (await readdir('data')).map(s => s.substring(0, s.length - 5));
        res.render('home', {
            files,
        });
    });

module.exports = {
    homeRouter,
}
