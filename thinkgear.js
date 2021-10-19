const {createClient} = require('node-thinkgear-sockets');
const prompts = require('prompts');
const {writeFile, readdir, mkdir} = require('fs').promises;

const jsonTemplate = {
    eSense: {
        attention: [],
        meditation: [],
    },
    eegPower: {
        delta: [],
        theta: [],
        lowAlpha: [],
        highAlpha: [],
        lowBeta: [],
        highBeta: [],
        lowGamma: [],
        highGamma: [],
    }
}

const blinkData = [];

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
    try {
        await readdir(`data/${subject}`);
    } catch (e) {
        await mkdir(`data/${subject}`);
    }
    const dataFileName = `data/${subject}/${experiment}.json`;
    const blinkFileName = `data/${subject}/${experiment}_blink.json`;

    const client = createClient();

    client
        .on('data', async data => {
            with (jsonTemplate.eSense) {
                attention.push(data.eSense.attention);
                meditation.push(data.eSense.meditation);
            }
            with (jsonTemplate.eegPower) {
                delta.push(data.eegPower.delta);
                theta.push(data.eegPower.theta);
                lowAlpha.push(data.eegPower.lowAlpha);
                highAlpha.push(data.eegPower.highAlpha);
                lowBeta.push(data.eegPower.lowBeta);
                highBeta.push(data.eegPower.highBeta);
                lowGamma.push(data.eegPower.lowGamma);
                highGamma.push(data.eegPower.highGamma);
            }
            try {
                await writeFile(dataFileName, jsonTemplate, 'utf-8');
            } catch (e) {
                console.error(e)
            }
        })
        .on('blink_data', async data => {
            blinkData.push(data.blinkStrength);
            try {
                await writeFile(blinkFileName, blinkData, 'utf-8');
            } catch(e) {
                console.error(e);
            }
        });

    client.connect();

})();

