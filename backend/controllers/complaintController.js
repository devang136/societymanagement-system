const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  try {
    console.log('Creating complaint with data:', req.body);
    console.log('User data:', {
      id: req.user._id,
      email: req.user.email,
      society: req.user.society,
      wing: req.user.wing,
      unit: req.user.unit
    });

    if (!req.user.wing || !req.user.unit) {
      return res.status(400).json({ 
        message: 'User wing and unit are required. Please update your profile.'
      });
    }

    const complaint = new Complaint({
      ...req.body,
      userId: req.user._id,
      society: req.user.society,
      wing: req.user.wing,
      unit: req.user.unit,
      status: 'Open'
    });

    await complaint.save();
    
    const populatedComplaint = await Complaint.findById(complaint._id)
      .populate('userId', 'firstName lastName');

    console.log('Created complaint:', populatedComplaint);
    res.status(201).json(populatedComplaint);
  } catch (error) {
    console.error('Create complaint error:', error);
    res.status(500).json({ 
      message: 'Error creating complaint',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ society: req.user.society })
      .populate('userId', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error('Get complaints error:', error);
    res.status(500).json({ message: 'Error fetching complaints' });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findOneAndUpdate(
      { _id: req.params.id, society: req.user.society },
      req.body,
      { new: true }
    );
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (error) {
    console.error('Update complaint error:', error);
    res.status(500).json({ message: 'Error updating complaint' });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findOneAndDelete({
      _id: req.params.id,
      society: req.user.society
    });
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error('Delete complaint error:', error);
    res.status(500).json({ message: 'Error deleting complaint' });
  }
};
