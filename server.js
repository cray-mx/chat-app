const express = require('express');
const app = express();
const socket = require('socket.io');
const bodyParser = require('body-parser'); 

let credentials = [];

let server = app.listen(5000, () => {
    console.log("Server is listening on 5000");
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

const io = socket(server, {
  cors: {
    origin: '*'
  }
});

app.post('/create', (req, res) => {

  const addUser = () => {
      credentials.push({
      id: req.body.id,
      name: req.body.name,
      password: req.body.password
    });
  }

  if(credentials.find(user => user.id === req.body.id))
      res.json(false);
  else{
    addUser();
    res.json(true);
  }
});

io.on('connection', (socket) => {
    console.log("Made socket connection");
    socket.on('name sent', (message) => {
        console.log("Message is " + message);
        io.emit('name sent back', message);
    });
});

