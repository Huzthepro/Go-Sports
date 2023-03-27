import userCollection from "../models/userModel.js";
import jasonWebToken from "jsonwebtoken";
import mongoose from "mongoose";

const createToken = (_id) => {
  return jasonWebToken.sign({ _id: _id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Login User  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
// Route= api/user/login/
// Method: POST
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userCollection.login(email, password);
    // Create Token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Signup User  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
// Route= api/user/signup/
// Method: POST
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userCollection.signup(email, password);
    // Create Token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { loginUser, signupUser };
