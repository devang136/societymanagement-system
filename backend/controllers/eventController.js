const Event = require('../models/Event');

const eventController = {
  createEvent: async (req, res) => {
    try {
      const event = new Event({
        ...req.body,
        society: req.user.society
      });
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getEvents: async (req, res) => {
    try {
      const events = await Event.find({ society: req.user.society });
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getEventById: async (req, res) => {
    try {
      const event = await Event.findOne({
        _id: req.params.id,
        society: req.user.society
      });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateEvent: async (req, res) => {
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
      res.status(400).json({ message: error.message });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const event = await Event.findOneAndDelete({
        _id: req.params.id,
        society: req.user.society
      });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json({ message: 'Event deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = eventController; 