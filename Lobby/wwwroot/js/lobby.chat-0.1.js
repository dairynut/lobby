"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

document.getElementById("confirmName").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg =  user.bold() + ": " + msg;
    var li = document.createElement("li");
    li.innerHTML = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
    $('.messageDisplayList').scrollTop($('.messageDisplayList')[0].scrollHeight);
});

connection.start().then(function () {
    document.getElementById("confirmName").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("confirmName").addEventListener("click", function (event) {
    $('#userField').addClass('hidden');
    $('#messageInputField').removeClass('hidden');
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessageToAllUsers", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
