const { roomModel } = require("./dataModel");
const colors = ["orca", "blackwidowspider", "wolverine"];
const joinRoom = async (roomId, name, password, idUser) => {
  try {
    var result = await roomModel.findOne({ roomId }).exec();
    if (result === null) {
      return { status: "error", detail: "ไม่พบเลขห้อง", req };
    } else if (result.password !== password) {
      return { status: "error", detail: "password ไม่ถูกต้อง" };
    } else {
      let player = { id: idUser, nickName: name };
      result.user.push(player);
      await result.save();
      return result;
    }
  } catch (error) {
    return { status: "error", detail: error };
  }
};
const createRoom = async (roomName, userMax, password, map, banker) => {
  try {
    const e = new roomModel({
      roomName,
      userMax,
      password,
      map,
      banker,
    });
    var result = await e.save();
    return result;
  } catch (error) {
    return { status: "error", detail: "สร้างไม่สำเร็จ", e: error.toString() };
  }
};
const reConnect = async (roomId, banker) => {
  try {
    var result = await roomModel.findOne({ roomId }).exec();
    result.banker = banker;
    await result.save();
    return result;
  } catch (error) {
    return {
      status: "error",
      detail: "update banker ไม่ได้",
      e: error.toString(),
    };
  }
};
const getRoomStatus = async (roomId) => {
  try {
    var result = await roomModel.findOne({ roomId }).exec();
    return result;
  } catch (error) {
    return { status: "error", detail: "หาห้องไม่เจอ", e: error.toString() };
  }
};
module.exports = {
  joinRoom,
  createRoom,
  reConnect,
  getRoomStatus,
};
