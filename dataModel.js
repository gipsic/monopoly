const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("strictQuery", true);
const dburl =
  "mongodb+srv://tonbee159:tonfai08@cluster0.qgqzi.mongodb.net/test";
console.log("Connecting to DB...");
mongoose.connect(dburl).catch((e) => {
  console.error("Error Connecting to DB" + e);
  console.log("Good Bye !");
  process.exit(1);
});

const roomSchema = new Schema({
  roomId: { type: String, required: false },
  roomName: { type: String, required: false },
  password: { type: String, required: false },
  userMax: { type: Number, required: false },
  user: { type: [], required: false },
  map: { type: String, required: false },
  create_date: { type: Date, default: Date.now },
  deleted: { type: String, required: false },
});
const roomModel = mongoose.model("room", roomSchema);

module.exports = {
  roomModel,
};
