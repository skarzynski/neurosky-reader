const prompts = require("prompts");
const {writeFile, readFile} = require('fs').promises;

const preprocess = async (subject, experiment) => {

    const data = JSON.parse(await readFile(`data/${subject}/${experiment}.json`));
    const {eegPower} = data;
    const eegCopy = {
        delta: [...eegPower.delta],
        theta: [...eegPower.theta],
        lowAlpha: [...eegPower.lowAlpha],
        highAlpha: [...eegPower.highAlpha],
        lowBeta: [...eegPower.lowBeta],
        highBeta: [...eegPower.highBeta],
        lowGamma: [...eegPower.lowGamma],
        highGamma: [...eegPower.highGamma],
    }

    for (let i = 0; i < eegPower.delta.length; i++) {
        if (i > 9 && i < eegPower.delta.length - 10) {

            eegPower.delta[i] = Math.round(eegCopy.delta.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16);
            eegPower.theta[i] = Math.round(eegCopy.theta.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16);
            eegPower.lowAlpha[i] = Math.round(eegCopy.lowAlpha.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16);
            eegPower.highAlpha[i] = Math.round(eegCopy.highAlpha.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16);
            eegPower.lowBeta[i] = Math.round(eegCopy.lowBeta.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16);
            eegPower.highBeta[i] = Math.round(eegCopy.highBeta.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16);
            eegPower.lowGamma[i] = Math.round(eegCopy.lowGamma.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16);
            eegPower.highGamma[i] = Math.round(eegCopy.highGamma.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16);

        }
    }

    eegPower.delta = eegPower.delta.slice(10, eegPower.delta.length - 10);
    eegPower.theta = eegPower.theta.slice(10, eegPower.theta.length - 10);
    eegPower.lowAlpha = eegPower.lowAlpha.slice(10, eegPower.lowAlpha.length - 10);
    eegPower.highAlpha = eegPower.highAlpha.slice(10, eegPower.highAlpha.length - 10);
    eegPower.lowBeta = eegPower.lowBeta.slice(10, eegPower.lowBeta.length - 10);
    eegPower.highBeta = eegPower.highBeta.slice(10, eegPower.highBeta.length - 10);
    eegPower.lowGamma = eegPower.lowGamma.slice(10, eegPower.lowGamma.length - 10);
    eegPower.highGamma = eegPower.highGamma.slice(10, eegPower.highGamma.length - 10);

    try {
        await writeFile(`data/${subject}/${experiment}_preprocessed.json`, JSON.stringify(data), 'utf-8');
        console.log('Preprocessed');
    } catch (e) {
        console.error(e)
    }

};

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

    const {subject, experiment} = await prompts(questions);

    await preprocess(subject, experiment);

})();
