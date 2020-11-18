const config = require('./config.json');
const utils = require('./utils.js')
const Log = require('./vendor/Log')
const Database = require('./src/Database')

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var database = new Database();

app.use(express.static(config.public_folder));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/${config.views_folder}/chat.html`);
});


io.on('connection', (socket) => {
    // console.log(io.engine.clientsCount)
    //@ip
    const userAddress = socket.handshake.address;

    Log.display(`${userAddress} connected`);
    //send uuid
    socket.emit('chatapp.log', { 'id': socket.client.id });

    database.addUser(socket.client.id, "Unknow")
    io.emit('chatapp.users.total', { 'total': database.users.length });

    socket.on('chatapp.message', (msg) => {
        Log.display(`${userAddress} send '${msg}'`);
        io.emit('chatapp.message', msg);
    });
    socket.on('disconnect', () => {

        database.deleteUser(socket.client.id)
        io.emit('chatapp.users.total', { 'total': database.users.length });

        console.log(database.users.length)
        Log.display(`${userAddress} disconnected`);
    });
});



http.listen(config.port, () => {
    console.log(`*** ${config.name} is listening (${config.port})`)
});