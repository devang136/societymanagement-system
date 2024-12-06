const societyService = require("../services/societyService");

exports.createSociety = async (req, res) => {
  try {
    const society = await societyService.createSociety(req.body);
    res.status(201).json(society);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error while creating society" });
  }
};

exports.getAllSocieties = async (req, res) => {
  try {
    const societies = await societyService.getAllSocieties();
    res.status(200).json(societies);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error while fetching societies" });
  }
};

exports.getSocietyById = async (req, res) => {
  try {
    const society = await societyService.getSocietyById(req.params.id);
    if (!society) {
      return res.status(404).json({ error: "Society not found" });
    }
    res.status(200).json(society);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error while fetching society details" });
  }
};

exports.updateSociety = async (req, res) => {
  try {
    const society = await societyService.updateSociety(req.params.id, req.body);
    if (!society) {
      return res.status(404).json({ error: "Society not found" });
    }
    res.status(200).json(society);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error while updating society" });
  }
};

exports.deleteSociety = async (req, res) => {
  try {
    const society = await societyService.deleteSociety(req.params.id);
    if (!society) {
      return res.status(404).json({ error: "Society not found" });
    }
    res.status(200).json({ message: "Society deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error while deleting society" });
  }
};
