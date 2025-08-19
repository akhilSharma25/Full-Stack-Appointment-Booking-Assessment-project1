// middlewares/isAuth.js
import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("isAuthenticated - Token:", token ? "Token present" : "No token"); // Debug log
    if (!token) {
      return res.status(401).json({ message: "No token provided", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("isAuthenticated - Decoded:", decoded); // Debug log
    req.user = { id: decoded.id, role: decoded.role }; // Expect role in decoded
    next();
  } catch (error) {
    console.error("isAuthenticated - Auth Error:", error.message);
    return res.status(401).json({ message: "Authentication Failed", success: false });
  }
};