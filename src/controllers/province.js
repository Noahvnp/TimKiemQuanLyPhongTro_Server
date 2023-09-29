import * as services from "../services/province";

export const getProvincesController = async (req, res) => {
  try {
    const response = await services.getProvincesService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get all provinces controller" + error,
    });
  }
};
