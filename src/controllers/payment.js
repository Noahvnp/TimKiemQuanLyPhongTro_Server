import * as paymentService from "../services/payment";

export const createPayment = async (req, res) => {
  try {
    const { renterId, contractId } = req.body;
    const { id } = req.user;

    if (!renterId || !contractId || !id) {
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    }
    const response = await paymentService.createPaymentService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to create payment " + error + req.body,
    });
  }
};

export const getPayment = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    const response = await paymentService.getPaymentService(id, req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get rooms controller" + error,
    });
  }
};

export const getYourPayment = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    const response = await paymentService.getYourPaymentService(id, req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get payment controller" + error,
    });
  }
};

export const acceptPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;
    const { id } = req.user;
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    const response = await paymentService.acceptPaymentservice(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to accept payment controller" + error,
    });
  }
};

export const updateYourPayment = async (req, res) => {
  try {
    const { paymentId, paymentMethod } = req.body;
    const { id } = req.user;
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    const response = await paymentService.updateYourPaymentService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to update payment controller" + error,
    });
  }
};
