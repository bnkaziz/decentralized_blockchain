const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { v4: uuidv4 } = require("uuid");

router.route("/sign-up").post(async (req, res) => {
  try {
    const user = req.body;
    const count = await Users.count();

    // CHANGE THE PRIMARY KEY FROM COUNT TO ANOTHER METHODE
    // user.user_id = "user_" + (count + 1);
    // user.user_id = "user_3";

    user.user_id = uuidv4();

    await bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
    });

    await Users.create(user);
    res.json(user);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      const error = {
        error: {
          error_name: err.name,
          error_type: err.errors[0].type,
          error_message: err.errors[0].message,
        },
      };
      res.status(400).json(error);
    } else {
      res.status(400).json(err);
    }
  }
});

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw Error("There is no user with this email");
    }

    await bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        throw Error("Wrong password!");
      }
    });

    req.session.user_id = user.user_id;
    res.json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
