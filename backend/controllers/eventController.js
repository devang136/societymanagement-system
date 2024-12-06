const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    console.log('Getting events for society:', req.user.society);
    
    const events = await Event.find({ society: req.user.society })
      .populate('organizer', 'firstName lastName')
      .sort({ date: 1, time: 1 });

    console.log(`Found ${events.length} events`);
    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      society: req.user.society,
      organizer: req.body.organizer || `${req.user.firstName} ${req.user.lastName}`
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Error creating event' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, society: req.user.society },
      req.body,
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Error updating event' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      society: req.user.society
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Error deleting event' });
  }
};

exports.joinEvent = async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      society: req.user.society
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is already a participant
    if (event.participants.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already joined this event' });
    }

    // Check if event has reached max participants
    if (event.maxParticipants && event.participants.length >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Add user to participants
    event.participants.push(req.user._id);
    await event.save();

    res.json({ message: 'Successfully joined event' });
  } catch (error) {
    console.error('Join event error:', error);
    res.status(500).json({ message: 'Error joining event' });
  }
}; 