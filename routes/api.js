const express = require('express');
const {readFile} = require('fs').promises;

const apiRouter = express.Router();

apiRouter
    .get('/getData/:fileName', async (req, res) => {
        const data = JSON.parse(await readFile(`data/${req.params.fileName}.json`));
        res.json(data);
    });

module.exports = {
    apiRouter,
}
