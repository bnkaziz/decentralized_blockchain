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
      attributes: ["user_id", "password", "is_admin"],
    });

    if (!user) {
      const err = new Error("There is no user with this email");
      // err.statusCode = 400;
      throw err;
    }

    await bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        const err = new Error("Wrong password!");
        // err.statusCode = 400;
        throw err;
      }
    });

    req.session.user_id = user.user_id;
    req.session.is_admin = user.is_admin;
    // console.log(req.session);

    await sessionService.addSessionToUserSet(user.user_id, req.sessionID);

    res.json({ user_id: user.user_id });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const signUp = async (req, res) => {
  try {
    let user = req.body;

    user.user_id = uuidv4();

    await bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
    });

    await Users.create(user);

    user = await Users.findByPk(user.user_id, {
      attributes: ["user_id", "is_admin"],
    });

    req.session.user_id = user.user_id;
    req.session.is_admin = user.is_admin;

    await sessionService.addSessionToUserSet(user.user_id, req.sessionID);

    res.json({ user_id: user.user_id });
  } catch (err) {
    res.json(err);
  }
};

const logout = async (req, res) => {
  try {
    // Delete the current session from the user's set of sessions in the session store
    await sessionService.deleteSessionFromUserSet(
      req.session.user_id,
      req.sessionID,
      (err, message) => {
        if (err) {
          console.error("Failed to delete sessions: ", err);
        } else {
          console.log(message);
        }
      }
    );

    req.session.destroy();

    // Delete the cookie in the client side
    res.clearCookie("sessionID", { path: "/" });
    res.json("You logged out successfully");
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = { login, signUp, logout };
