require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const serverless = require('serverless-http');
const cors = require('cors');

const db = require('./model');
const routes = require('./routes');

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db.sequelize.sync({ force: false }).then(() => {
  console.log('DB has been re sync');
});

app.use('/api/v1/beatbuzz', routes);

module.exports = app;
module.exports.handler = serverless(app);
