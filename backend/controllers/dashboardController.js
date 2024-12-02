const { Complaint, User } = require('../models');

exports.getDashboardData = async (req, res) => {
  try {
    // Get recent complaints
    const complaints = await Complaint.find({
      society: req.user.society._id
    })
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 })
    .limit(5);

    const formattedComplaints = complaints.map(complaint => ({
      id: complaint._id,
      name: complaint.createdBy.name,
      complaintName: complaint.title,
      date: complaint.createdAt.toLocaleDateString(),
      priority: complaint.priority,
      status: complaint.status,
      description: complaint.description,
      wing: complaint.wing,
      unit: complaint.unit,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${complaint.createdBy._id}`
    }));

    // Get statistics
    const totalComplaints = await Complaint.countDocuments({ society: req.user.society._id });
    const pendingComplaints = await Complaint.countDocuments({ 
      society: req.user.society._id,
      status: 'Pending'
    });
    const solvedComplaints = await Complaint.countDocuments({ 
      society: req.user.society._id,
      status: 'Solve'
    });

    const dashboardData = {
      complaints: formattedComplaints,
      stats: {
        totalComplaints,
        pendingComplaints,
        solvedComplaints
      }
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Get dashboard data error:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
}; 