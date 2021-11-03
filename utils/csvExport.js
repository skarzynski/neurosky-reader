const {readFile} = require('fs').promises;

const createCSVFile = async (subject, fileName) => {
    const {eSense, eegPower} = JSON.parse(await readFile(`data/${subject}/${fileName}.json`));
    const length = eSense.attention.length;
    let csv = 'attention;meditation;delta;theta;lowAlpha;highAlpha;lowBeta;highBeta;lowGamma;highGamma\n';
    for (let i = 0; i < length; i++) {
        csv += `${eSense.attention[i]};${eSense.meditation[i]};${eegPower.delta[i]};${eegPower.theta[i]};${eegPower.lowAlpha[i]};${eegPower.highAlpha[i]};${eegPower.lowBeta[i]};${eegPower.highBeta[i]};${eegPower.lowGamma[i]};${eegPower.highGamma[i]}\n`;
    }
    return csv;
};

module.exports = {
    createCSVFile,
}
