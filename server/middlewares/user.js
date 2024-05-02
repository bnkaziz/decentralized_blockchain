const { Users } = require("../models");

const userExists = async (req, res, next) => {
  let user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    const err = new Error("Email already in use!");
    err.statusCode = 409;
    next(err);
  }

  user = await Users.findOne({
    where: {
      phone_number: req.body.phone_number,
    },
  });

  if (user) {
    const err = new Error("Phone number already in use!");
    err.statusCode = 409;
    next(err);
  }

  next();
};

module.exports = userExists;
