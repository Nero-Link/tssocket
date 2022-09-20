import express from "express";
import path from "path";
import http from "http";
import socketIO from "socket.io";
import LuckyNumbersGame from "./luckyNumbersGame";

const port: number = 3000;

class App {
  private server: http.Server;
  private port: number;

  private game: LuckyNumbersGame;

  constructor(port: number) {
    this.port = port;
    const app = express();
    app.use(express.static(path.join(__dirname, "../client")));

    this.server = new http.Server(app);
    const io = new socketIO.Server(this.server, { serveClient: true });

    this.game = new LuckyNumbersGame();

    io.on("connection", function (socket: socketIO.Socket) {
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

      socket.on("thanksresponse", function (message: any) {
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

  public Start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on Port ${this.port}.`);
    });
  }
}

new App(port).Start();
