class Client {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io();

    this.socket.on("connect", function () {
      console.log("connect");
      document.body.innerHTML = "Connected to Server <br />";
    });

    this.socket.on("disconnect", function (message: any) {
      console.log("disconnect " + message);
      document.body.innerHTML +=
        "Disconnected from Server : " + message + "<br/>";
      //location.reload();
    });

    this.socket.on("message", (message: any) => {
      console.log(message);
      document.body.innerHTML += message + "<br/>";
      this.socket.emit("thanksresponse", "Thanks for having me");
    });

    this.socket.on("random", function (message: any) {
      console.log(message);
      document.body.innerHTML += "Winning number is " + message + "<br/>";
    });

    this.socket.on("noproblemresponse", function (message: any) {
      console.log(message);
      document.body.innerHTML += "We got a no problem back <br/>";
    });
  }
}

const client = new Client();
