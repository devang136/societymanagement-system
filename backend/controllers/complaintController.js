const complaintService = require('../services/complaintService');

exports.createComplaint = async (req, res) => {
  try {
    console.log('Received complaint data:', req.body);
    
    const complaintData = {
      ...req.body,
      status: req.body.status || 'Open',
      requestDate: new Date().toISOString().split('T')[0]
    };
    
    const complaint = await complaintService.createComplaint(complaintData);
    console.log('Created complaint:', complaint);
    res.status(201).json(complaint);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ 
      message: 'Failed to create complaint',
      error: error.message 
    });
  }
};

exports.getComplaint = async (req, res) => {
  try {
    const complaint = await complaintService.getComplaintById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await complaintService.getAllComplaints();
    res.status(200).json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ 
      message: 'Failed to fetch complaints',
      error: error.message 
    });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await complaintService.deleteComplaint(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
