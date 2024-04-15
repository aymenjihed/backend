'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const chauffeurRoutes = require('./routes/Chauffeur-routes'); // ajustement du nom du fichier
const adminRoutes = require('./routes/Admin-routes'); // ajustement du nom du fichier

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', chauffeurRoutes.routes);
app.use('/api', adminRoutes.routes);

app.listen(config.port, () => console.log('App is listening on url https://backend-pi-sage-90.vercel.app/:' + config.port));
