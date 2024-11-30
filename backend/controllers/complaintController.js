const { Complaint } = require('../models');

exports.createComplaint = async (req, res) => {
  try {
    const { title, description, priority, category } = req.body;

    if (!req.user || !req.user.society) {
      return res.status(401).json({ message: 'User or society not found' });
    }

    const complaint = new Complaint({
      title,
      description,
      priority,
      category,
      createdBy: req.user._id,
      society: req.user.society._id,
      status: 'Open'
    });

    await complaint.save();

    const populatedComplaint = await Complaint.findById(complaint._id)
      .populate('createdBy', 'name')
      .populate('society', 'name');

    res.status(201).json(populatedComplaint);
  } catch (error) {
    console.error('Create complaint error:', error);
    res.status(500).json({
      message: 'Error creating complaint',
      error: error.message
    });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    if (!req.user || !req.user.society) {
      return res.status(401).json({ message: 'User or society not found' });
    }

    const complaints = await Complaint.find({
      society: req.user.society._id
    })
    .populate('createdBy', 'name')
    .populate('society', 'name')
    .populate('assignedTo', 'name')
    .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    console.error('Get complaints error:', error);
    res.status(500).json({
      message: 'Error fetching complaints',
      error: error.message
    });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    )
    .populate('createdBy', 'name')
    .populate('society', 'name')
    .populate('assignedTo', 'name');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    console.error('Update complaint error:', error);
    res.status(500).json({
      message: 'Error updating complaint',
      error: error.message
    });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findOneAndDelete({
      _id: id,
      society: req.user.society._id
    });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error('Delete complaint error:', error);
    res.status(500).json({
      message: 'Error deleting complaint',
      error: error.message
    });
  }
};
