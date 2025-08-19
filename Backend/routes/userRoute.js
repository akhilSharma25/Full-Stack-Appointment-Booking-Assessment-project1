import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRoute = express.Router();

// Register Route
userRoute.route("/register").post(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashPassword });

    return res.status(201).json({ message: "Account created successfully", success: true });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ message: "Backend Error in Registration", success: false });
  }
});

// Login Route
userRoute.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required", success: false });
    }

    const userExist = await User.findOne({ email }).select("username email password role");
    if (!userExist) {
      return res.status(401).json({ message: "Incorrect Email or Password", success: false });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Email or Password", success: false });
    }

    const token = jwt.sign({ id: userExist._id, role: userExist.role }, process.env.SECRET_KEY, { expiresIn: "1d" });

    return res
      .cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 })
      .status(200)
      .json({
        message: `Welcome back ${userExist.username}`,
        success: true,
        user: { id: userExist._id, username: userExist.username, email: userExist.email, role: userExist.role },
      });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Backend Error in login", success: false });
  }
});

// Logout Route
userRoute.route("/logout").get((req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logout Successfully", success: true });
  } catch (error) {
    console.error("Error in Logout:", error);
    return res.status(500).json({ message: "Backend Error in Logout", success: false });
  }
});

export default userRoute;
