import express from "express";
import path from "path";
import http from "http";
import socketIO from "socket.io";

const port: number = 3000;

class App {
  private server: http.Server;
  private port: number;

  constructor(port: number) {
    this.port = port;
    const app = express();
    app.use(express.static(path.join(__dirname, "../client")));

    this.server = new http.Server(app);
    const io = new socketIO.Server(this.server, { serveClient: true });

    io.on("connection", function (socket: socketIO.Socket) {
      console.log("User connected : " + socket.id);

      socket.emit("message", "Hello " + socket.id);

      socket.broadcast.emit("message", "Everybody, say hello to " + socket.id);

      socket.on("disconnect", function () {
        console.log("Socket disconnected : " + socket.id);
      });
    });
    setInterval(() => {
      io.emit("random", Math.floor(Math.random() * 10));
    }, 10000);
  }

  public Start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on Port ${this.port}.`);
    });
  }
}

new App(port).Start();
