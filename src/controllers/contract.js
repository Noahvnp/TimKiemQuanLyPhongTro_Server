import * as contractService from "../services/contract";

export const createContract = async (req, res) => {
  try {
    const { room, customer, categoryCode } = req.body;
    const { id } = req.user;

    if ((!room && categoryCode === "CTPT") || !id || !customer) {
      return res.status(400).json({
        err: 1,
        msg: "Missing or invalid",
      });
    }
    const response = await contractService.createContractService(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to create room " + error + req.body,
    });
  }
};

export const getContract = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });

    const response = await contractService.getContractService(id, req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get contract controller" + error,
    });
  }
};
