const { roomModel } = require("./dataModel");

const joinRoom = async (roomId, name, password) => {
  try {
    var result = await room.findOne({ roomId }).exec();
    if (result === null) {
      return { status: "error", detail: "ไม่พบเลขห้อง", req };
    } else if (result.password === password) {
      return { status: "error", detail: "password ไม่ถูกต้อง" };
    } else {
    }
  } catch (error) {}
};
const createRoom = async () => {
  return {};
};
module.exports = {
  joinRoom,
  createRoom,
};
