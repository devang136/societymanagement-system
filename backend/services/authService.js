const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.getChairman = () => {
  return User.find({ role: 'admin' });
};

exports.registerChairman = async (chairmanData) => {
  const { firstName, lastName, email, phoneNumber, country, state, city, society, password } = chairmanData;

  let chairman = await User.findOne({ email });
  if (chairman) {
    throw new Error('User already exists');
  }

  chairman = new User({
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    state,
    city,
    society,
    password,
    role: 'admin'
  });

  const salt = await bcrypt.genSalt(10);
  chairman.password = await bcrypt.hash(password, salt);

  await chairman.save();

  return chairman;
};

exports.loginChairman = async (email, password) => {
  const chairman = await User.findOne({ email, role: 'admin' });
  if (!chairman) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, chairman.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return chairman;
};

exports.findUser = (email) => {
  return User.findOne({ email: email });
};

exports.getUserByEmail = (email) => {
  return User.findOne({ email });
};

exports.generateToken = (userId) => {
  const payload = {
    user: {
      id: userId,
    },
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};


