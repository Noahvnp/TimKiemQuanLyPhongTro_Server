import * as rentalSerivce from "../services/rental";

export const rental = async (req, res) => {
  const { name, phone } = req.body;
  const { postId } = req.query;
  const { id } = req.user;
  try {
    if (!name || !phone || !postId || !id) {
      return res.status(400).json({
        err: 1,
        msg: "Missing or invalid",
      });
    }

    const response = await rentalSerivce.rentalSerivce(req.body, id, postId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at rental controller: " + error,
    });
  }
};

export const getRenters = async (req, res) => {
  try {
    const { postId } = req.query;
    const response = await rentalSerivce.getRentersService(postId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get renter controller" + error,
    });
  }
};

export const acceptRenter = async (req, res) => {
  try {
    const { renterId } = req.query;
    const response = await rentalSerivce.acceptRenterService(renterId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get renter controller" + error,
    });
  }
};
