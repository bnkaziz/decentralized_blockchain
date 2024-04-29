// A user should be able to update ONLY his data (user_id of user (session) === user_id of request.params)
const sameUser = (req, res, next) => {
  if (req.params.user_id !== req.session.user_id) {
    const err = new Error("Not authorized to do this operation!");
    err.statusCode = 403;
    next(err);
  }

  next();
};

module.exports = sameUser;
