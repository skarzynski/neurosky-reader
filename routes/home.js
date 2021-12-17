const express = require('express');

const {fetchDataStructure} = require('../utils/dataFiles');

const homeRouter = express.Router();

homeRouter
    .get('/', async (req, res) => {
        const filesStructure = [];
        await fetchDataStructure('data', filesStructure);
        filesStructure.sort((a, b) => {
            const propA = Object.keys(a)[0];
            const propB = Object.keys(b)[0];
            return propA.localeCompare(propB, undefined, {
                numeric: true,
                sensitivity: 'base'
            });
        });
        const files = {};
        for (const filesStructureElement of filesStructure) {
            const [[key, value]] = Object.entries(filesStructureElement);
            if (!files[key]) {
                files[key] = [];
            }
            files[key].push(value);
        }
        res.render('home', {
            files,
        });
    });

module.exports = {
    homeRouter,
}
