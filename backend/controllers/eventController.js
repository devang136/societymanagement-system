const { Event } = require('../models');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      society: req.user.society._id,
      status: { $in: ['upcoming', 'ongoing'] }
    })
    .sort({ activityDate: 1 });

    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

exports.participateInEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is already participating
    if (event.participants.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already participating in this event' });
    }

    // Add user to participants
    event.participants.push(req.user._id);
    await event.save();

    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    console.error('Participate in event error:', error);
    res.status(500).json({ message: 'Error registering for event' });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const activities = await Event.find({
      society: req.user.society._id,
      participants: req.user._id
    })
    .sort({ activityDate: -1 });

    res.json(activities);
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ message: 'Error fetching activities' });
  }
}; 