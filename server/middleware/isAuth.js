const jwt = require("jsonwebtoken");

async function isAuthenticated(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.userId = decoded.id;
    next();
  } catch (e) {
    return res.status(401).json({ success: false, error: e.message });
  }
}

async function adminGuard(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ success: false, error: "Forbidden: Admin access required" });
  }
  next();
}

module.exports = {
  isAuthenticated,
  adminGuard,
};
