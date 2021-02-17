const express = require('express');
const app = express();
const socket = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { router } = require('./Route');
require('dotenv').config();

let server;

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(res => {
    console.log("Connected to db");
    server = app.listen(5000, () => console.log("Server started at port 5000"));
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.use('/', router);
