const SecurityProtocol = require('../models/SecurityProtocol');

exports.getProtocols = async (req, res) => {
  try {
    if (!req.user || !req.user.society) {
      return res.status(401).json({ message: 'User or society not found' });
    }

    const protocols = await SecurityProtocol.find({ society: req.user.society })
      .populate('createdBy', 'firstName lastName')
      .sort({ priority: 'asc', createdAt: 'desc' });

    console.log(`Fetched ${protocols.length} protocols for society:`, req.user.society);
    res.json(protocols);
  } catch (error) {
    console.error('Get protocols error:', error);
    res.status(500).json({ 
      message: 'Error fetching protocols',
      error: error.message 
    });
  }
};

exports.createProtocol = async (req, res) => {
  try {
    if (!req.user || !req.user.society) {
      return res.status(401).json({ message: 'User or society not found' });
    }

    const protocol = new SecurityProtocol({
      ...req.body,
      society: req.user.society,
      createdBy: req.user._id
    });

    await protocol.save();
    
    const populatedProtocol = await SecurityProtocol.findById(protocol._id)
      .populate('createdBy', 'firstName lastName');

    res.status(201).json(populatedProtocol);
  } catch (error) {
    console.error('Create protocol error:', error);
    res.status(500).json({ 
      message: 'Error creating protocol',
      error: error.message 
    });
  }
};

exports.updateProtocol = async (req, res) => {
  try {
    if (!req.user || !req.user.society) {
      return res.status(401).json({ message: 'User or society not found' });
    }

    const protocol = await SecurityProtocol.findOneAndUpdate(
      { 
        _id: req.params.id,
        society: req.user.society
      },
      req.body,
      { new: true }
    ).populate('createdBy', 'firstName lastName');

    if (!protocol) {
      return res.status(404).json({ message: 'Protocol not found' });
    }

    res.json(protocol);
  } catch (error) {
    console.error('Update protocol error:', error);
    res.status(500).json({ 
      message: 'Error updating protocol',
      error: error.message 
    });
  }
};

exports.deleteProtocol = async (req, res) => {
  try {
    if (!req.user || !req.user.society) {
      return res.status(401).json({ message: 'User or society not found' });
    }

    const protocol = await SecurityProtocol.findOneAndDelete({
      _id: req.params.id,
      society: req.user.society
    });

    if (!protocol) {
      return res.status(404).json({ message: 'Protocol not found' });
    }

    res.json({ message: 'Protocol deleted successfully' });
  } catch (error) {
    console.error('Delete protocol error:', error);
    res.status(500).json({ 
      message: 'Error deleting protocol',
      error: error.message 
    });
  }
};

// Add other controller methods as needed... 