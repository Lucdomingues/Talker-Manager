const fs = require('fs').promises;

async function readFs() {
    try {
        const readFile = await fs.readFile('src/talker.json', 'utf-8');
        const data = JSON.parse(readFile);
        return data;
    } catch (error) {
       return console.error(`Não foi possível ler o arquivo: ${error.message}`);
    }
}

module.exports = {
    readFs,
};