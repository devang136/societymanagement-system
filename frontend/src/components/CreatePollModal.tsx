const handleCreate = async () => {
  try {
    const pollData = {
      question,
      pollType,
      options
    };

    console.log('Creating poll:', pollData);
    const newPoll = await pollService.createPoll(pollData);

    onPollCreated(newPoll);
    onClose();
    toast.success('Poll created successfully');
  } catch (error) {
    console.error('Failed to create poll:', error);
    toast.error('Failed to create poll');
  }
}; 