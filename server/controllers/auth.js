const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const sessionService = require("../services/session");

const login = async (req, res) => {
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
    req.session.is_admin = user.is_admin;
    console.log(req.session);

    await sessionService.addSessionToUserSet(user.user_id, req.sessionID);

    res.json({ user_id: user.user_id });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const signUp = async (req, res) => {
  try {
    const user = req.body;

    user.user_id = uuidv4();

    await bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
    });

    await Users.create(user);

    req.session.user_id = user.user_id;
    req.session.is_admin = user.is_admin;

    await sessionService.addSessionToUserSet(user.user_id, req.sessionID);

    res.json(user);
  } catch (err) {
    res.json(err);
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy();

    res.clearCookie("sessionID", { path: "/" });
    res.json("You logged out successfully");
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = { login, signUp, logout };
