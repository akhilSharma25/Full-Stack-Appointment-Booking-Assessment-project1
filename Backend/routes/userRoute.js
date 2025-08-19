import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRoute = express.Router();

// Register User
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(401)
        .json({ message: "Something is missing ", success: false });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(401)
        .json({ message: "User is already exist", success: false });
    }

    //hash
    const hashPassword = await bcrypt.hash(password, 10);
    const userCreate = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return res
      .status(201)
      .json({ message: "Account Created Successfully", success: true });
  } catch (error) {
    console.log("Error in registration", error);
    return res
      .status(500) // Changed to 500 for server-side errors
      .json({ message: "Backend Error in Registration", success: false });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }

    const userExist = await User.findOne({ email }).select(
      "username email password role"
    );
    if (!userExist) {
      return res
        .status(401)
        .json({ message: "Incorrect Email or Password", success: false });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect Email or Password", success: false });
    }

    const token = jwt.sign(
      { id: userExist._id, role: userExist.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: `Welcome back ${userExist.username}`,
        success: true,
        user: {
          id: userExist._id,
          username: userExist.username,
          email: userExist.email,
          role: userExist.role,
        },
      });
  } catch (error) {
    console.error("Error in login:", error.message);
    return res
      .status(500)
      .json({ message: "Backend Error in login", success: false });
  }
};

// Logout User
const logOut = async (_, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res
      .status(200)
      .json({
        message: "Logout Successfully",
        success: true,
      });
  } catch (error) {
    console.error("Error in Logout:", error);
    return res
      .status(500)
      .json({
        message: "Backend Error in Logout",
        success: false,
      });
  }
};


// --- ROUTES ---
userRoute.route("/register").post(register);
userRoute.route("/login").post(login);
userRoute.route("/logout").get(logOut);

export default userRoute;
