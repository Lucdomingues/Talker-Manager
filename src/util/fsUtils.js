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

async function writeFs(path, text) {
    try {
         await fs.writeFile(path, text);
    } catch (err) {
        console.error(`Erro ao escrever o arquivo: ${err.message}`);
    }
}

module.exports = {
    readFs,
    writeFs,
};