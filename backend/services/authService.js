const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
  });

  const salt = await bcrypt.genSalt(10);
  chairman.password = await bcrypt.hash(password, salt);

  await chairman.save();

  return chairman;
};

exports.loginChairman = async (email, password) => {
  const chairman = await User.findOne({ email });
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

exports.generateToken = (chairmanId) => {
  const payload = {
    user: {
      id: chairmanId,
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


