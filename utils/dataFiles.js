const {readdir, stat} = require('fs').promises;

const fetchDataStructure = async (dir, filesStructure) => {
    const files = await readdir(dir);
    for (const file of files) {
        const stats = await stat(`${dir}/${file}`);
        if (stats.isDirectory()) {
            return fetchDataStructure(`${dir}/${file}`, filesStructure);
        } else {
            filesStructure.push({[dir.substring(5)]: file.substring(0, file.length - 5)});
        }
    }
};

module.exports = {
    fetchDataStructure,
}
