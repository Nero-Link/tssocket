"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const luckyNumbersGame_1 = __importDefault(require("./luckyNumbersGame"));
const port = 3000;
class App {
    constructor(port) {
        this.port = port;
        const app = (0, express_1.default)();
        app.use(express_1.default.static(path_1.default.join(__dirname, "../client")));
        this.server = new http_1.default.Server(app);
        const io = new socket_io_1.default.Server(this.server, { serveClient: true });
        this.game = new luckyNumbersGame_1.default();
        io.on("connection", function (socket) {
            console.log("User connected : " + socket.id);
            // this.game.LuckyNumbers[socket.id] = Math.floor(Math.random() * 10);
            // socket.emit(
            //   "message",
            //   "Hello " +
            //     socket.id +
            //     ", your lucky number is " +
            //     this.game.LuckyNumbers[socket.id]
            // );
            socket.emit("message", "Hello " + socket.id);
            socket.broadcast.emit("message", "Everybody, say hello to " + socket.id);
            socket.on("disconnect", function () {
                console.log("Socket disconnected : " + socket.id);
            });
            socket.on("thanksresponse", function (message) {
                console.log(socket.id + "says: " + message);
                socket.emit("noproblemresponse", "No Problem");
            });
        });
        setInterval(() => {
            io.emit("random", Math.floor(Math.random() * 10));
        }, 10000);
        // setInterval(() => {
        //   let randomNumber: number = Math.floor(Math.random() * 10);
        //   let winners: string[] = this.game.GetWinners(randomNumber);
        //   if (winners.length) {
        //     winners.forEach((w) => {
        //       io.to(w).emit("message", "*** You are the winner ***");
        //     });
        //   }
        //   io.emit("random", randomNumber);
        // }, 10000);
    }
    Start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on Port ${this.port}.`);
        });
    }
}
new App(port).Start();
//# sourceMappingURL=server.js.map