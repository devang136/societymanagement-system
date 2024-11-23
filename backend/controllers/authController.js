const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const chairman = await authService.registerChairman(req.body);
    const token = await authService.generateToken(chairman.id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  try {
    // Find the user from the database based on email
    const findUser = await authService.findUser(email);

    console.log(findUser);

    if (!findUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare the entered password with the hashed password from the database
    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if (isPasswordValid) {
      let data = {
        _id: findUser._id,
        email: findUser.email,
        contactNumber: findUser.contactNumber,
        role: findUser.role,
      };

      const token = createToken(data);

      // Set the token in a cookie
      res.cookie("login_token", token);

      return res.status(200).json({
        message: "Login successful",
      });
    } else {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while logging in",
    });
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
    <html>
    <head>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f7fb;
                color: #333;
                line-height: 1.6;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                background-color: #0061f2;
                color: #ffffff;
                padding: 15px;
                border-radius: 8px 8px 0 0;
                font-size: 24px;
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

