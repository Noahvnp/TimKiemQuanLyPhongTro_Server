import * as overviewService from "../services/overview";

export const getOverview = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    const response = await overviewService.getOverview(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get overview controller" + error,
    });
  }
};

export const getOverviewAdmin = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    const response = await overviewService.getOverviewAdmin();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get overview controller" + error,
    });
  }
};
