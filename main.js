const axios = require("axios");
const WebSocketServer = require("ws");
const { joinRoom, createRoom } = require("./api");

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
// Creating connection using websocket
wss.on("connection", function connection(ws) {
  ws.id = wss.getUniqueID();
  const send = (obj) => {
    ws.send(JSON.stringify(obj));
  };
  console.log("New User Joined Server", ws.id);
  send({
    cmd: "welcome",
    clientID: ws.id,
  });

  ws.on("message", async function (raw) {
    const { cmd, ...data } = JSON.parse(raw.toString());
    console.log("มีคนส่ง", cmd, "จาก", ws.id);
    if (cmd === "createRoom") {
      const res = await createRoom(
        data.roomId,
        data.nickName,
        data.password,
        data.map,
        ws.id
      );
      send({ cmd: "_createRoom", data: res });
    } else if (cmd === "ping") {
      send({ cmd: "pong", ping: data.ts });
    } else if (cmd === "joinRoom") {
      const res = await joinRoom(
        data.roomId,
        data.nickName,
        data.password,
        ws.id
      );
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
