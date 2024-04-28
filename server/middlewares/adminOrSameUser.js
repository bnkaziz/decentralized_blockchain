const adminOrSameUser = (req, res, next) => {
  if (!req.session.is_admin && req.body.user_id !== req.session.user_id) {
    console.log(req.session);
    const err = new Error("Not authorized to do this operation!");
    err.statusCode = 403;
    next(err);
  }

  next();
};

module.exports = adminOrSameUser;
