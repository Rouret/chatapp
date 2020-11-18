var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { v4: uuidv4 } = require('uuid');
const config = require('./config.json');
const utils = require('./utils.js')
const Log = require('./vendor/Log')

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/${config.public_folder}/index.html`);
});


io.on('connection', (socket) => {
    //@ip
    const userAddress = socket.handshake.address;

    Log.display(`${userAddress} connected`);
    //send uuid
    socket.emit('chatapp.log', { 'id': uuidv4() });

    socket.on('chatapp.message', (msg) => {
        Log.display(`${userAddress} send '${msg}'`);
        io.emit('chatapp.message', msg);
    });
    socket.on('disconnect', () => {
        Log.display(`${userAddress} disconnected`);
    });
});



http.listen(config.port, () => {
    console.log(`*** ${config.name} is listening (${config.port})`)
});