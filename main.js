const axios = require("axios");
const WebSocketServer = require("ws");

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 });

wss.getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4();
};
function createRoom(ws) {
  axios
    .post("http://localhost:5000/room")
    .then(function (response) {
      console.log(response.data.roomId);
      ws.send(response.data.roomId);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
// Creating connection using websocket
wss.on("connection", function connection(ws) {
  ws.id = wss.getUniqueID();

  console.log("New User Joined Server", ws.id);
  ws.send("Welcome " + ws.id);
  ws.on("message", function (data) {
    console.log("มีคนส่งข้อความว่า", data.toString(), "จาก", ws.id);
    if (data.toString() === "createRoom") {
      createRoom(ws);
    } else {
      var x = 0;
      wss.clients.forEach(function (client) {
        console.log("client" + ++x);
        if (client !== ws && client.readyState === WebSocketServer.OPEN) {
          client.send("> " + data);
        }
      });
    }
  });
});
console.log("The WebSocket server is running on port 8080");
