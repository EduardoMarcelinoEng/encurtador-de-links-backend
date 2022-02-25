const express = require('express');
const app = express();
const { httpPort, env } = require('./src/config');
const { linkController } = require('./src/controllers');
const cors = require('cors');
const path = require('path');
require('./src/cronJobs');

app.use(express.static(path.resolve(__dirname, 'src', 'assets')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/link', linkController);

app.listen(httpPort, ()=>
    console.log(`Ambiente de ${env=='develop' ? 'desenvolvimento' : 'produção'} rodando na porta ${httpPort}`));