// Import necessary modules
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

// Number of salt rounds for password hashing
const SALT_ROUNDS = 10;

// Function to hash a password
const hashPassword = async (password) => bcrypt.hash(password, SALT_ROUNDS);

// Function to send a password reset email
const sendResetEmail = async (email, token, BASE_URL) => {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER, // SMTP user
      pass: process.env.SMTP_PASS, // SMTP password
    },
  });

  // Generate reset link
  const resetLink = `${BASE_URL}/resetPassword/${token}`;

  // Mail options
  const mailOptions = {
    from: process.env.SMTP_USER, // Sender email
    to: email, // Recipient email
    subject: "Password Reset", // Email subject
    text: `You requested a password reset. Click the following link to reset your password: ${resetLink}`, // Plain text email body
    html: `<p>You requested a password reset. Click the following link to reset your password: <a href="${resetLink}">Reset Password</a></p>`, // HTML email body
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return true; // Return true if email sent successfully
  } catch (error) {
    console.error("Error sending reset email:", error);
    return false; // Return false if email sending fails
  }
};

const uploadToCloudinary = async (file, presetType) => {

  let uploadPreset;

  if(presetType === 'product') {
    uploadPreset = process.env.REACT_APP_CLOUDINARY_PRODUCT_UPLOAD_PRESET;
  } else if(presetType === 'profile') {
    uploadPreset = process.env.REACT_APP_CLOUDINARY_USER_PROFILE_UPLOAD_PRESET;
  } else {
    throw new Error('Invalid preset type')
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    throw new Error(`Error uploading image to Cloudinary: ${error.message}`);
  }
};


// Function to generate a reset token
const generateResetToken = () => crypto.randomBytes(20).toString("hex");

// Export functions
module.exports = {
  generateResetToken,
  sendResetEmail,
  hashPassword,
  uploadToCloudinary,
};
