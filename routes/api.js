const express = require('express');
const {readFile} = require('fs').promises;

const apiRouter = express.Router();

apiRouter
    .get('/getData', async (req, res) => {
        const data = JSON.parse(await readFile('data/test.json'));
        res.json(data);
    });

module.exports = {
    apiRouter,
}
