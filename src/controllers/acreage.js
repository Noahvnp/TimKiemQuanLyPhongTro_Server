import * as services from "../services/acreage";

export const getAcreagesController = async (req, res) => {
  try {
    const response = await services.getAcreagesService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get all acreages controller" + error,
    });
  }
};
