const express = require('express');
const {readFile} = require('fs').promises;

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/json', async (req, res) => {
    const json = JSON.parse(await readFile('data/test.json'));
    res.json(json);
})

app.listen(3000, 'localhost');
