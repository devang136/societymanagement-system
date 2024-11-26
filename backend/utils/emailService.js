const nodemailer = require('nodemailer');
const { AppError } = require('./errorHelper');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendResetPasswordEmail = async (email, resetToken) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = {
      from: `"Society Management" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>You have requested to reset your password</h1>
        <p>Please click the link below to reset your password:</p>
        <a href="${resetUrl}" target="_blank">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>This link will expire in 10 minutes.</p>
      `
    };

    await transporter.sendMail(message);
  } catch (error) {
    throw new AppError('Email could not be sent', 500);
  }
};