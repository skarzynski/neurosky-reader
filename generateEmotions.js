const {writeFile, readdir, mkdir, readFile} = require('fs').promises;
const prompts = require('prompts');
const fetch = require('node-fetch');

const questions = [
    {
        type: 'text',
        name: 'subject',
        message: 'Enter subject name/ID',
    },
    {
        type: 'text',
        name: 'experiment',
        message: 'Enter experiment name',
    }
];

(async () => {

    const result = {
        prediction: []
    };

    let resultCSV = 'prediction\n';

    const {subject, experiment} = await prompts(questions);
    try {
        await readdir(`emotions/${subject}`);
    } catch (e) {
        await mkdir(`emotions/${subject}`);
    }

    const {eegPower} = JSON.parse(await readFile(`data/${subject}/${experiment}_preprocessed.json`));

    for (let i = 0; i < eegPower.delta.length; i++) {
        const body = {
            "Delta": eegPower.delta[i],
            "Theta": eegPower.theta[i],
            "LowAlpha": eegPower.lowAlpha[i],
            "HighAlpha": eegPower.highAlpha[i],
            "LowBeta": eegPower.lowBeta[i],
            "HighBeta": eegPower.highBeta[i],
            "LowGamma": eegPower.lowGamma[i],
            "HighGamma": eegPower.highGamma[i]
        }

        const response = await fetch('https://mlmodel1webapi120211115210524.azurewebsites.net/predict', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const {prediction} = await response.json();

        result.prediction.push(prediction);
        resultCSV += `${prediction}\n`;
    }
    try {
        await writeFile(`emotions/${subject}/${experiment}.json`, JSON.stringify(result), 'utf-8');
        await writeFile(`emotions/${subject}/${experiment}.csv`, resultCSV, 'utf-8');
        console.log('Predicted');
    } catch (e) {
        console.error(e)
    }
})();
