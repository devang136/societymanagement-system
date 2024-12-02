const { User, Member, Vehicle } = require('../models');

exports.getPersonalDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('society');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get members
    const members = await Member.find({
      user: user._id,
      society: user.society._id
    });

    // Get vehicles
    const vehicles = await Vehicle.find({
      user: user._id,
      society: user.society._id
    });

    const personalDetails = {
      fullName: user.name,
      phoneNumber: user.contactNumber,
      emailAddress: user.email,
      gender: user.gender || 'Not specified',
      wing: user.wing,
      age: user.age || 0,
      unit: user.unit,
      relation: 'Self',
      members,
      vehicles,
      maintenanceAmount: 1500, // You can get this from your maintenance model
      penaltyAmount: 500 // You can get this from your maintenance model
    };

    res.json(personalDetails);
  } catch (error) {
    console.error('Get personal details error:', error);
    res.status(500).json({ message: 'Error fetching personal details' });
  }
}; 