const express = require('express');
const app = express();
const socket = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { router } = require('./Route');
require('dotenv').config();
const User = require('./schema');

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(res => {
    console.log("Connected to Database");
})
.catch(err => console.log('Could not connect to Database'));

const server = app.listen(5000, () => console.log("Server started at port 5000"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.use('/', router);

//SOCKET CODE

const io = socket(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', socket => {
  console.log("Client has connected");

  socket.on('join', msgObject => {
      socket.join(msgObject.senderEmail);
  });

  socket.on('client-msg', msg => {
      msg.conversations.forEach(recipient => {
        io.to(recipient.email).emit('server-msg', msg)
      });
      io.to(msg.senderEmail).emit('server-msg', msg);
  })
});




