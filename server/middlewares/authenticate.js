const authenticate = (req, res, next) => {
  console.log("Authenticate: ");
  console.log("Session: ", req.session);
  console.log(`User_id: ${req.session.user_id}`);
  if (!req.session || !req.session.user_id) {
    const err = new Error("Not authorized!");
    err.statusCode = 401;
    next(err);
  }

  next();
};

module.exports = authenticate;
