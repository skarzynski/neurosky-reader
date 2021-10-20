const express = require('express');
const {readFile} = require('fs').promises;

const apiRouter = express.Router();

apiRouter
    .get('/getData/:subject/:fileName', async (req, res) => {
        const {subject, fileName} = req.params;
        const data = JSON.parse(await readFile(`data/${subject}/${fileName}.json`));
        res.json(data);
    });

module.exports = {
    apiRouter,
}
