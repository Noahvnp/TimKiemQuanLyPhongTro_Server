import * as roomService from "../services/room";

export const createRoom = async (req, res) => {
  try {
    const { postId } = req.body;
    const { id } = req.user;

    if (!postId || !id) {
      return res.status(400).json({
        err: 1,
        msg: "Missing or invalid",
      });
    }
    const response = await roomService.createRoomService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to create room " + error + req.body,
    });
  }
};

export const getRooms = async (req, res) => {
  try {
    const { postId } = req.query;
    if (!postId)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    const response = await roomService.getRoomService(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get rooms controller" + error,
    });
  }
};
