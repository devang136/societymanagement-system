const societyService = require('../services/societyService');

exports.createSociety = async (req, res) => {
  try {
    const society = await societyService.createSociety(req.body);
    res.json(society);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllSocieties = async (req, res) => {
  try {
    const societies = await societyService.getAllSocieties();
    res.json(societies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getSocietyById = async (req, res) => {
  try {
    const society = await societyService.getSocietyById(req.params.id);
    if (!society) {
      return res.status(404).json({ msg: 'Society not found' });
    }
    res.json(society);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateSociety = async (req, res) => {
  try {
    const society = await societyService.updateSociety(req.params.id, req.body);
    if (!society) {
      return res.status(404).json({ msg: 'Society not found' });
    }
    res.json(society);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteSociety = async (req, res) => {
  try {
    const society = await societyService.deleteSociety(req.params.id);
    if (!society) {
      return res.status(404).json({ msg: 'Society not found' });
    }
    res.json({ msg: 'Society removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};