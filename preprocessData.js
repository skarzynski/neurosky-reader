const {writeFile, readdir, mkdir, readFile} = require('fs').promises;

const preprocess = async (subject, experiment) => {

    const data = JSON.parse(await readFile(`data/${subject}/${experiment}.json`));
    const {eegPower} = data;

    for (let i = 0; i < eegPower.delta.length; i++) {
        if (i > 9 && i < eegPower.delta.length - 10) {

            eegPower.delta[i] = eegPower.delta.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16;
            eegPower.theta[i] = eegPower.theta.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16;
            eegPower.lowAlpha[i] = eegPower.lowAlpha.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16;
            eegPower.highAlpha[i] = eegPower.highAlpha.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16;
            eegPower.lowBeta[i] = eegPower.lowBeta.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16;
            eegPower.highBeta[i] = eegPower.highBeta.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16;
            eegPower.lowGamma[i] = eegPower.lowGamma.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16;
            eegPower.highGamma[i] = eegPower.highGamma.slice(i - 8, i + 8).reduce((a, b) => a + b) / 16;

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

    data.eegPower = eegPower;
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

    const experiments = ['Rest', 'Plank', 'Rollercoaster', 'Nature'];

    for (let i = 0; i < 15; i++) {
        for (const experiment of experiments) {
            if (i === 2 && experiment === 'Rest') {
                continue;
            }
            await preprocess(`Subject${i}`, experiment);
        }
    }

})();
