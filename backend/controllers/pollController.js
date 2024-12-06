const Poll = require('../models/Poll');

exports.createPoll = async (req, res) => {
  try {
    if (!req.user || !req.user.society) {
      return res.status(401).json({ message: 'User or society not found' });
    }

    console.log('Creating poll with data:', req.body);
    console.log('User data:', {
      id: req.user._id,
      society: req.user.society
    });

    const formattedOptions = req.body.options.map(option => ({
      text: option,
      votes: 0
    }));

    const poll = new Poll({
      question: req.body.question,
      pollType: req.body.pollType,
      options: formattedOptions,
      createdBy: req.user._id,
      society: req.user.society
    });

    await poll.save();
    
    const populatedPoll = await Poll.findById(poll._id)
      .populate('createdBy', 'firstName lastName');

    console.log('Created poll:', populatedPoll);
    res.status(201).json(populatedPoll);
  } catch (error) {
    console.error('Create poll error:', error);
    res.status(500).json({ 
      message: 'Error creating poll',
      error: error.message 
    });
  }
};

exports.getPolls = async (req, res) => {
  try {
    if (!req.user || !req.user.society) {
      return res.status(401).json({ message: 'User or society not found' });
    }

    const polls = await Poll.find({ society: req.user.society })
      .populate('createdBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    console.log(`Fetched ${polls.length} polls for society:`, req.user.society);
    res.json(polls);
  } catch (error) {
    console.error('Get polls error:', error);
    res.status(500).json({ 
      message: 'Error fetching polls',
      error: error.message 
    });
  }
};

exports.votePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { optionIndex } = req.body;
    
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    // Check if user has already voted
    const hasVoted = poll.options.some(option => 
      option.voters.includes(req.user._id)
    );

    if (hasVoted) {
      return res.status(400).json({ message: 'Already voted' });
    }

    // Add vote
    poll.options[optionIndex].votes += 1;
    poll.options[optionIndex].voters.push(req.user._id);
    
    await poll.save();
    
    const populatedPoll = await Poll.findById(poll._id)
      .populate('createdBy', 'name')
      .populate('options.voters', 'name');

    res.json(populatedPoll);
  } catch (error) {
    console.error('Vote poll error:', error);
    res.status(500).json({ 
      message: 'Error voting on poll',
      error: error.message 
    });
  }
};

exports.getUserPolls = async (req, res) => {
  try {
    const polls = await Poll.find({ 
      createdBy: req.user._id,
      society: req.user.society._id
    })
    .populate('createdBy', 'name')
    .populate('options.voters', 'name')
    .sort({ createdAt: -1 });
    
    res.json(polls);
  } catch (error) {
    console.error('Get user polls error:', error);
    res.status(500).json({ 
      message: 'Error fetching user polls',
      error: error.message 
    });
  }
};

exports.updatePoll = async (req, res) => {
  try {
    if (!req.user || !req.user.society) {
      return res.status(401).json({ message: 'User or society not found' });
    }

    const poll = await Poll.findOneAndUpdate(
      { 
        _id: req.params.id, 
        society: req.user.society,
        createdBy: req.user._id // Only creator can update
      },
      req.body,
      { new: true }
    ).populate('createdBy', 'firstName lastName');

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found or unauthorized' });
    }

    res.json(poll);
  } catch (error) {
    console.error('Update poll error:', error);
    res.status(500).json({ 
      message: 'Error updating poll',
      error: error.message 
    });
  }
};

exports.deletePoll = async (req, res) => {
  try {
    if (!req.user || !req.user.society) {
      return res.status(401).json({ message: 'User or society not found' });
    }

    const poll = await Poll.findOneAndDelete({
      _id: req.params.id,
      society: req.user.society,
      createdBy: req.user._id // Only creator can delete
    });

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found or unauthorized' });
    }

    res.json({ message: 'Poll deleted successfully' });
  } catch (error) {
    console.error('Delete poll error:', error);
    res.status(500).json({ 
      message: 'Error deleting poll',
      error: error.message 
    });
  }
}; 