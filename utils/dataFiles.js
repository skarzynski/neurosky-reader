const {readdir, stat} = require('fs').promises;

const fetchDataStructure = async (dir, filesStructure) => {
    const files = await readdir(dir);
    for (const file of files) {
        const stats = await stat(`${dir}/${file}`);
        if (stats.isDirectory()) {
            await fetchDataStructure(`${dir}/${file}`, filesStructure);
        } else {
            if (file.substring(0, file.length - 5).search('_blink') === -1) {
                filesStructure.push({[dir.substring(5)]: file.substring(0, file.length - 5)});
            }
        }
    }
};

module.exports = {
    fetchDataStructure,
}
