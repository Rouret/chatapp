import Chat from './model/Chat.js';

var id;

function setMessage(message) {
    return { id: id, message: message }
}

function gotoBottom(id) {
    var element = document.getElementById(id);
    element.scrollTop = element.scrollHeight - element.clientHeight;
}
$(function() {
    var socket = io();
    $('#form').submit(function(e) {
        e.preventDefault();
        const msgValue = $('#msg-content').val();
        socket.emit('chatapp.message', setMessage(msgValue));
        $('#msg-content').val('');
        return false;
    });

    socket.on('chatapp.message', function(msg) {
        Chat.display("#chat", msg.id, msg.message, msg.id === id ? Chat.USER : Chat.OTHER)
        gotoBottom("chat")
    });

    socket.on('chatapp.log', function(msg) {
        id = msg.id;
    });
});