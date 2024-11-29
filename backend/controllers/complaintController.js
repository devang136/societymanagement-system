const complaintService = require('../services/complaintService');

exports.createComplaint = async (req, res) => {
  try {
    console.log('Received complaint data:', req.body);
    
    const complaintData = {
      ...req.body,
      status: req.body.status || 'Open',
      requestDate: new Date().toISOString().split('T')[0],
      priority: req.body.priority || 'Medium'
    };
    
    console.log('Formatted complaint data:', complaintData);
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
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Complaint ID is required" });
    }

    console.log('Deleting complaint with ID:', id);
    const complaint = await complaintService.deleteComplaint(id);
    
    if (!complaint) {
      console.log('Complaint not found');
      return res.status(404).json({ message: "Complaint not found" });
    }
    
    console.log('Complaint deleted successfully:', complaint);
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error('Error deleting complaint:', error);
    if (error.message.includes('Invalid complaint ID')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ 
      message: 'Failed to delete complaint',
      error: error.message 
    });
  }
};
