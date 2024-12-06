const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getPersonalDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get maintenance details
    const maintenanceDetails = {
      pending: [
        {
          billDate: '11/01/2024',
          pendingDate: '11/01/2024',
          maintenanceAmount: 1000.00,
          penaltyAmount: 250.00,
          grandTotal: 1250.00
        },
        // Add more pending maintenance entries
      ],
      due: [
        {
          date: '11/01/2024',
          amount: 1000.00,
          dueAmount: 250.00
        },
        // Add more due maintenance entries
      ]
    };

    // Get announcements
    const announcements = [
      {
        title: 'Community Initiatives',
        date: '01/02/2024',
        time: '10:15 AM',
        description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.'
      },
      // Add more announcements
    ];

    res.json({
      ...user,
      maintenanceDetails,
      announcements
    });
  } catch (error) {
    console.error('Get personal details error:', error);
    res.status(500).json({ message: 'Error fetching personal details' });
  }
};

exports.updatePersonalDetails = async (req, res) => {
  try {
    const allowedUpdates = [
      'firstName',
      'lastName',
      'phone',
      'country',
      'state',
      'city',
      'wing',
      'unit'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update personal details error:', error);
    res.status(500).json({ message: 'Error updating personal details' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Error changing password' });
  }
}; 