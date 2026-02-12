const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        message: "hanya admin yang bisa mengakses ini", 
        });
    }
    next();
  }
};

module.exports = checkRole;