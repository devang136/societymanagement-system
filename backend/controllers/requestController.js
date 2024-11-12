const requestService = require('../services/requestService');

exports.createRequest = async (req, res) => {
  try {
    const request = await requestService.createRequest(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRequest = async (req, res) => {
  try {
    const request = await requestService.getRequestById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};