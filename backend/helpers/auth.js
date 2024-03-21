const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signup = async (email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email exists");
      error.status = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hashedPassword,
    });

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Auth failed");
      error.statusCode = 401;
      throw error;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const error = new Error("Auth failed");
      error.statusCode = 401;
      throw error;
    } else {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1H",
        }
      );

      return token;
    }

    // return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signup,
  login,
};
