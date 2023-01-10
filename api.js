const { roomModel } = require("./dataModel");

const joinRoom = async (roomId, name, password, idUser) => {
  try {
    var result = await roomModel.findOne({ roomId }).exec();
    if (result === null) {
      return { status: "error", detail: "ไม่พบเลขห้อง", req };
    } else if (result.password === password) {
      return { status: "error", detail: "password ไม่ถูกต้อง" };
    } else {
      result.user = result.user.push(idUser);
      await result.save();
      return { status: "error", detail: "password ไม่ถูกต้อง" };
    }
  } catch (error) {}
};
const createRoom = async (roomName, userMax, password, map, banker) => {
  try {
    const roomId = Math.floor(Math.random() * 10000);
    const e = new roomModel({
      roomId: roomId,
      roomName,
      userMax,
      password,
      map,
      banker,
    });
    var result = await e.save();
    return result;
  } catch (error) {
    return { status: "error", detail: "สร้างไม่สำเร็จ" };
  }
};
module.exports = {
  joinRoom,
  createRoom,
};
