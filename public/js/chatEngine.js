import Chat from './model/Chat.js';
import Modal from './model/Modal.js';
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
    Modal.init("modal", "modal-text", "modal-close")
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
    socket.on('chatapp.users.total', function(msg) {
        $("#totalUsers").html((msg.total === undefined ? 0 : msg.total) + " connected")
    });
    socket.on('chatapp.log', function(msg) {
        id = msg.id;
    });

    $("#settings").click(() => {
        Modal.open();
    })
});