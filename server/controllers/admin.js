const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const sessionService = require("../services/session");

const adminSignUp = async (req, res) => {
  try {
    let user = req.body;

    user.user_id = uuidv4();
    await bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
    });
    user.is_admin = true;

    await Users.create(user);

    user = await Users.findByPk(user.user_id);

    req.session.user_id = user.user_id;
    req.session.is_admin = user.is_admin;

    await sessionService.addSessionToUserSet(user.user_id, req.sessionID);

    res.json({ user_id: user.user_id });
  } catch (err) {
    res.json(err);
  }
};

module.exports = { adminSignUp };
