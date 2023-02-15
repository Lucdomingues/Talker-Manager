const express = require('express');
const { readFs, writeFs } = require('../util/fsUtils');
const {
    validateToken,
    validateName,
    validateTalk, 
    validateAge,
    validateRate,
} = require('../middlewares/validateTalk');
     
const path = 'src/talker.json';

const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const result = await readFs();
        if (result.length === 0) {
            return res.status(200).json([]);
        }
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

router.get('/search', validateToken, async (req, res) => {
    try {
        const { q } = req.query;
        const readFile = await readFs();
        const searchQuery = readFile.filter((element) => element.name.includes(q));
        return res.status(200).json(searchQuery);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await readFs();
        if (result.id === Number(id)) {
            return res.status(200).json(result);
        }
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

router.post('/',
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateRate,
    async (req, res) => {
    try {
        const { name, age, talk } = req.body;
        const result = await readFs();
        const newTalker = {
            id: result.length + 1,
            name,
            age,
            talk,
        };
        const oldElement = await readFs();
        await writeFs(path, JSON.stringify([...oldElement, newTalker]));
        return res.status(201).json(newTalker);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
    });

router.put('/:id', validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateRate,
    async (req, res) => {
        try {
            const { id } = req.params;
            const { name, age, talk } = req.body;
            const readFile = await readFs();
            const index = readFile.findIndex((element) => element.id === Number(id));
            const updateTalker = { id: Number(id), name, age, talk };
            readFile[index] = updateTalker;
            await writeFs(path, JSON.stringify([...readFile]));
            return res.status(200).json(readFile[index]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    });
 
router.delete('/:id', validateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const readFile = await readFs();
        const index = readFile.findIndex((element) => element.id === Number(id));
        readFile.splice(index, 1);
        await writeFs(path, JSON.stringify([...readFile]));
        return res.status(204).json();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;