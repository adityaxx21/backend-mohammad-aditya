const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "Authorization denied" });
  }
  next();
};

module.exports = adminMiddleware;
