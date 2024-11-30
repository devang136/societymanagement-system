const authService = require('../services/authService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// get user 
exports.getUser = async (req, res) => {
  const user = await authService.getChairman();


  res.status(200).json({
    message: "User get success",
    data: user,
  });
};

exports.register = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      society, 
      wing, 
      unit, 
      phone, 
      country, 
      state, 
      city 
    } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name: `${firstName} ${lastName}`,
      email,
      password,
      society,
      wing,
      unit,
      contactNumber: phone,
      address: `${city}, ${state}, ${country}`,
      role: 'user'
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        society: user.society,
        wing: user.wing,
        unit: user.unit
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    // Find user
    const user = await User.findOne({ 
      email: email.toLowerCase().trim(),
      isActive: true 
    }).populate('society');

    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        society: user.society.name,
        wing: user.wing,
        unit: user.unit
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Sending OTP via email
exports.sendOTP = async (req, res) => {
  const { email } = req.body; 

  try {
      const user = await User.findOne({
          $or: [{ email: email }]
      });

      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }
      const otp = crypto.randomInt(100000, 999999).toString();

      otpMap.set(email, { otp, expiresIn: Date.now() + 15 * 60 * 1000 });

      await sendEmail(user.email, otp);

      res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'viraniparth6@gmail.com', 
          pass: 'ialblsxsqdlyevwa' 
      }
  });
  const mailOptions = {
    from: 'viraniparth6@gmail.com', // Your email
    to: email,  // Recipient's email
    subject: 'Password Reset OTP - Society Management System',  // Email subject
    html: `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset OTP</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f7fb;
            color: #333;
            line-height: 1.6;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #0061f2;
            color: #ffffff;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #555;
        }
        .otp-box {
            background-color: #f4f4f4;
            padding: 15px;
            font-size: 24px;
            font-weight: bold;
            color: #0061f2;
            text-align: center;
            border-radius: 5px;
            margin: 30px 0;
        }
        .footer {
            font-size: 14px;
            color: #888;
            text-align: center;
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
        .footer a {
            color: #0061f2;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Society Management System
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>We received a request to reset your password. Please use the following One-Time Password (OTP) to complete the process:</p>
            <div class="otp-box">
                ${otp}
            </div>
            <p><strong>Note:</strong> This OTP will expire in 10 minutes. If you did not request a password reset, please ignore this email.</p>
            <p>If you need assistance, feel free to reach out to our support team.</p>
        </div>
        <div class="footer">
            <p>Thank you for using the Society Management System!</p>
            <p><a href="mailto:support@yourdomain.com">Contact Support</a></p>
        </div>
    </div>
</body>
</html>
    `
};

  await transporter.sendMail(mailOptions);
};

//verify otp
exports.verifyOTP = async (req, res) => {
  let { email, otp } = req.body;

  // Ensure otp is a string (in case it's passed as a number or other type)
  otp = String(otp).trim();  // Convert to string and trim any whitespace

  const normalizedEmail = email.trim().toLowerCase();  // Normalize email (trim and lowercase)
  console.log('Verifying OTP for:', normalizedEmail); 

  // Retrieve stored OTP for the email
  const storedOTP = otpMap.get(normalizedEmail); // Get OTP from map

  // Log both stored and received OTP for debugging
  console.log('Stored OTP:', storedOTP);  
  console.log('Received OTP:', otp);

  if (!storedOTP) {
    return res.status(400).json({ message: 'OTP not found or expired.' });
  }

  // Compare OTPs after ensuring both are strings
  if (String(storedOTP.otp).trim() !== otp) {
    return res.status(400).json({ message: 'Invalid OTP.' });
  }

  // Check expiry time
  console.log('Current Time:', Date.now());
  console.log('Expiry Time:', storedOTP.expiresIn);

  if (storedOTP.expiresIn < Date.now()) {
    otpMap.delete(normalizedEmail);  // Delete expired OTP
    return res.status(400).json({ message: 'OTP has expired.' });
  }

  // OTP is valid, delete it from the map after successful verification
  otpMap.delete(normalizedEmail);

  res.status(200).json({ message: 'OTP verified successfully.' });
};

// reset password
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
      const user = await User.findOne({
          $or: [{ email: email }]
      });
      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }
      user.password = newPassword;
      await user.save();

      res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

