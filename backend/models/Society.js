const mongoose = require("mongoose");

const SocietySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  wings: [{
    type: String,
    required: true
  }],
  totalUnits: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create test society function
const createTestSociety = async () => {
  try {
    const Society = mongoose.model('Society');
    
    // Delete existing test society
    await Society.deleteOne({ name: 'Test Society' });
    
    // Create new test society
    const society = new Society({
      name: 'Test Society',
      address: 'Test Address, Test City',
      wings: ['A', 'B', 'C'],
      totalUnits: 100
    });
    
    await society.save();
    console.log('Test society created successfully');
    return society;
  } catch (error) {
    console.error('Error creating test society:', error);
    throw error;
  }
};

// Create test society after connection is established
mongoose.connection.once('connected', () => {
  createTestSociety();
});

module.exports = mongoose.model("Society", SocietySchema);
