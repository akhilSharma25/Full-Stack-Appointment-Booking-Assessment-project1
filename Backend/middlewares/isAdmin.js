// middlewares/isAdmin.js
export default function isAdmin(req, res, next) {
  try {
    console.log("isAdmin - req.user:", req.user); // Debug log
    console.log("isAdmin - Role check:", req.user?.role); // Debug log
    if (req.user && req.user.role && req.user.role.toLowerCase() === "admin") {
      return next();
    }
    return res.status(403).json({
      error: { code: "FORBIDDEN", message: "Admin access required" },
    });
  } catch (err) {
    console.error("isAdmin - Error:", err.message); // Debug log
    return res.status(500).json({
      error: { code: "SERVER_ERROR", message: err.message },
    });
  }
}