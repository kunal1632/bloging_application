const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    // data fetch from request body
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check password matches
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password does not match",
      });
    }
    // check if the user is already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create entry in database
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // return resposne
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User canno be register. Something went wrong",
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate the data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Email and password required",
      });
    }

    // check if the user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registerd",
      });
    }
    // match password and generate jwt
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      user.token = token;
      user.password = undefined;

      //   create cookie and send in response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login fialed",
    });
  }
};

// change password controller

exports.changePassword = async (req, res) => {
  try {
    // get data from body
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // check both password match
    if (newPassword !== confirmNewPassword) {
      return res.status(403).json({
        success: false,
        message: "Confirm password should be same as your new password",
      });
    }

    // get user data
    const userDetails = await User.findById(req.user.id);

    // validation old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "The password is incorrect",
      });
    }

    // hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // update password in db
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: hashedNewPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while changing the password",
    });
  }
};
