import Chat from './model/Chat.js';
import Modal from './model/Modal.js';
var id;
var avatar = "https://stylizedbay.com/wp-content/uploads/2018/02/unknown-avatar.jpg";
var pseudo = "Unknow";

function setMessage(message) {
    return { id: id, avatar: avatar, pseudo: pseudo, message: message }
}

function gotoBottom(id) {
    var element = document.getElementById(id);
    element.scrollTop = element.scrollHeight - element.clientHeight;
}
$(function() {
    var socket = io();
    Modal.init("modal", "modal-close")
    $('#form').submit(function(e) {
        e.preventDefault();
        const msgValue = $('#msg-content').val();
        socket.emit('chatapp.message', setMessage(msgValue));
        $('#msg-content').val('');
        return false;
    });

    socket.on('chatapp.message', function(msg) {
        Chat.display("#chat", msg.pseudo, msg.avatar, msg.message, msg.id === id ? Chat.USER : Chat.OTHER)
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

    $("#urlAvatar").on("input", () => {
        avatar = $("#urlAvatar").val()
        $("#previewAvatar").css("background-image", `url('${link}')`)
            // socket.emit('chatapp.users.avatar', { avatar: link });
    })
    $("#pseudo").on("input", () => {
        pseudo = $("#pseudo").val()
    })
});