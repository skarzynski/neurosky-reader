const express = require('express');
const {readFile} = require('fs').promises;

const {createCSVFile} = require('../utils/csvExport');

const apiRouter = express.Router();

apiRouter

    .get('/getData/:subject/:fileName', async (req, res) => {
        const {subject, fileName} = req.params;
        const data = JSON.parse(await readFile(`data/${subject}/${fileName}.json`));
        res.json(data);
    })

    .get('/export/:subject/:fileName', async (req, res) => {
        const {subject, fileName} = req.params;
        const csv = await createCSVFile(subject, fileName);
        res.attachment(`${subject}_${fileName}.csv`);
        res.status(200).send(csv);
    });

module.exports = {
    apiRouter,
}
