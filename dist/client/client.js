"use strict";
class Client {
    constructor() {
        this.socket = io();
        this.socket.on("message", function (message) {
            console.log(message);
            document.body.innerHTML += message + "<br/>";
        });
        this.socket.on("random", function (message) {
            console.log(message);
            document.body.innerHTML += "Winning number is " + message + "<br/>";
        });
    }
}
const client = new Client();
