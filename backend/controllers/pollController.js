const { Poll } = require('../models');

exports.createPoll = async (req, res) => {
  try {
    const { question, pollType, options } = req.body;
    
    if (!question || !pollType || !options || options.length < 2) {
      return res.status(400).json({
        message: 'Please provide question, poll type, and at least 2 options'
      });
    }

    const poll = new Poll({
      question,
      pollType,
      options: options.map(option => ({ text: option })),
      createdBy: req.user._id,
      society: req.user.society._id
    });

    await poll.save();
    
    const populatedPoll = await Poll.findById(poll._id)
      .populate('createdBy', 'name')
      .populate('society', 'name')
      .populate('options.voters', 'name');

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
    const polls = await Poll.find({ 
      isActive: true,
      society: req.user.society._id
    })
    .populate('createdBy', 'name')
    .populate('society', 'name')
    .populate('options.voters', 'name')
    .sort({ createdAt: -1 });
    
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