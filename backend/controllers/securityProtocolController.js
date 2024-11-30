const { SecurityProtocol } = require('../models');

exports.getProtocols = async (req, res) => {
  try {
    if (!req.user || !req.user.society) {
      return res.status(401).json({ message: 'User or society not found' });
    }

    const protocols = await SecurityProtocol.find({
      society: req.user.society._id
    })
    .populate('createdBy', 'name')
    .sort({ priority: 1, createdAt: -1 });

    res.json(protocols);
  } catch (error) {
    console.error('Get protocols error:', error);
    res.status(500).json({
      message: 'Error fetching security protocols',
      error: error.message
    });
  }
};

exports.createProtocol = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    if (!req.user || !req.user.society) {
      return res.status(401).json({ message: 'User or society not found' });
    }

    const protocol = new SecurityProtocol({
      title,
      description,
      category,
      priority,
      society: req.user.society._id,
      createdBy: req.user._id
    });

    await protocol.save();

    const populatedProtocol = await SecurityProtocol.findById(protocol._id)
      .populate('createdBy', 'name');

    res.status(201).json(populatedProtocol);
  } catch (error) {
    console.error('Create protocol error:', error);
    res.status(500).json({
      message: 'Error creating security protocol',
      error: error.message
    });
  }
}; 