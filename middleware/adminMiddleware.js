const adminMiddleware = (req, res, next) => {
  console.log(req.user);
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "Authorization denied" });
  }
  next();
};

module.exports = adminMiddleware;
