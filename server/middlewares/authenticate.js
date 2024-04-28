const authenticate = (req, res, next) => {
  if (!req.session || !req.session.user_id) {
    const err = new Error("Not authorized!");
    err.statusCode = 401;
    next(err);
  }

  next();
};

module.exports = authenticate;
