const mongoose = require('mongoose');
const Msg = require('./messages');
const io = require('socket.io')(3000)
const mongoDB = 'mongodb+srv://Samirlc1:samirlamichhane@cluster0.gkoty.mongodb.net/chatapp?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected')
}).catch(err => console.log(err))
io.on('connection', (socket) => {
    Msg.find().then(result => {
        socket.emit('output-messages', result)
    })
    console.log('a user connected');
    socket.emit('message', 'Hello world');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chatmessage', msg => {
        const message = new Msg({ msg });
        message.save().then(() => {
            io.emit('message', msg)
        })


    })
});
/*const mongoose = require('mongoose');
const Msg= require('./messege');

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(3000);
const mongoDB = 'mongodb+srv://Samirlc1:samirlamichhane@cluster0.gkoty.mongodb.net/chatapp?retryWrites=true&w=majority';

mongoose.connect(mongoDB).then(()=>{
    console.log('Database Connected');
}).catch(err => console.log(err))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });



io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('message','Welcome User');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    }); 

  socket.on('chatmessage', msg => {
    const message = new Msg({msg});
    message.save().then(()=>{
        io.emit('message', msg)
    })
})
});
/*
server.listen(3000, () => {
  console.log('listening on *:3000');
});*/
