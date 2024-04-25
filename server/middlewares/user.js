const { Users } = require("../models");

const userExists = async (req, res, next) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    const err = new Error("A user with this email already exists!");
    err.statusCode = 409;
    next(err);
  }

  console.log("no user with this email, next");
  next();
};

module.exports = userExists;
