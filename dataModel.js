const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;
mongoose.set("strictQuery", true);
const dburl = "mongodb+srv://tonbee159:tonfai08@cluster0.qgqzi.mongodb.net/test";

console.log("Connecting to DB...");

var db = mongoose.createConnection(dburl);

autoIncrement.initialize(db);
 

const roomSchema = new Schema({
  roomId: { type: Number, required: false },
  roomName: { type: String, required: false },
  password: { type: String, required: false },
  userMax: { type: Number, required: false },
  user: { type: [], required: false },
  banker: { type: String, required: false },
  map: { type: String, required: false },
  create_date: { type: Date, default: Date.now },
  deleted: { type: String, required: false },
});
roomSchema.plugin(autoIncrement.plugin, {
  model: 'room',
  field: 'roomId',
  startAt: 9999,
  incrementBy: 1
});

const roomModel = db.model("room", roomSchema);

module.exports = {
  roomModel,
};
