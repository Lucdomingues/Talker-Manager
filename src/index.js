const express = require('express');
const talkRoutes = require('./routes/talkRoutes');

const app = express();
app.use(express.json());
app.use('/talker', talkRoutes);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
