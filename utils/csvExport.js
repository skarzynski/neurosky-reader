const {readFile} = require('fs').promises;

const createCSVFile = async (subject, fileName, params) => {
    const {eSense, eegPower} = JSON.parse(await readFile(`data/${subject}/${fileName}.json`));
    const length = eSense.attention.length;
    let csv = '';
    let line = '';
    if (params.attention === 'true') {
        line += 'attention;';
    }
    if (params.meditation === 'true') {
        line += 'meditation;';
    }
    if (params.delta === 'true') {
        line += 'delta;';
    }
    if (params.theta === 'true') {
        line += 'theta;';
    }
    if (params.lowAlpha === 'true') {
        line += 'lowAlpha;';
    }
    if (params.highAlpha === 'true') {
        line += 'highAlpha;';
    }
    if (params.lowBeta === 'true') {
        line += 'lowBeta;';
    }
    if (params.highBeta === 'true') {
        line += 'highBeta;';
    }
    if (params.lowGamma === 'true') {
        line += 'lowGamma;';
    }
    if (params.highGamma === 'true') {
        line += 'highGamma;';
    }
    line = line.slice(0, -1);
    line += '\n';
    csv += line;

    line = '';
    for (let i = 0; i < length; i++) {
        if (params.attention === 'true') {
            line += `${eSense.attention[i]};`;
        }
        if (params.meditation === 'true') {
            line += `${eSense.meditation[i]};`;
        }
        if (params.delta === 'true') {
            line += `${eegPower.delta[i]};`;
        }
        if (params.theta === 'true') {
            line += `${eegPower.theta[i]};`;
        }
        if (params.lowAlpha === 'true') {
            line += `${eegPower.lowAlpha[i]};`;
        }
        if (params.highAlpha === 'true') {
            line += `${eegPower.highAlpha[i]};`;
        }
        if (params.lowBeta === 'true') {
            line += `${eegPower.lowBeta[i]};`;
        }
        if (params.highBeta === 'true') {
            line += `${eegPower.highBeta[i]};`;
        }
        if (params.lowGamma === 'true') {
            line += `${eegPower.lowGamma[i]};`;
        }
        if (params.highGamma === 'true') {
            line += `${eegPower.highGamma[i]};`;
        }
        line = line.slice(0, -1);
        line += '\n';
        csv += line;
        line = '';
    }
    return csv;
};

module.exports = {
    createCSVFile,
}
