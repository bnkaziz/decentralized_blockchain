const authorize = (req, res, next) => {
  if (!req.session.is_admin) {
    console.log(req.session);
    const err = new Error("Admin privileges needed to do this operation!");
    err.statusCode = 403;
    next(err);
  }

  console.log(req.session);
  next();
};

module.exports = authorize;
