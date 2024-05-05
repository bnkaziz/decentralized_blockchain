const { Users } = require("../models");
const sessionService = require("../services/session");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
  const allUsers = await Users.findAll();

  res.json(allUsers);
};

// Create a user and add it to the database.
const createUser = async (req, res) => {
  try {
    const user = req.body;
    user.user_id = uuidv4();

    await bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
    });

    await Users.create(user);

    res.json({ user_id: user.user_id });
  } catch (err) {
    res.json(err);
  }
};

const getUserByID = async (req, res) => {
  const user = await Users.findByPk(req.params.user_id);

  if (!user) {
    res.status(400).json("User does not exist!");
    return;
  }

  res.json(user);
};

const getUserByEmail = async (req, res) => {
  const email = req.body.email;
  const user = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.status(400).json("User does not exist!");
    return;
  }

  res.json(user);
};

const getCurrentUser = async (req, res) => {
  console.log("current");
  try {
    if (!req.session.user_id) {
      res.status(400).json("No user connected!");
    }

    const user = await Users.findByPk(req.session.user_id);

    if (!user) {
      res.status(400).json("User does not exist!");
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.json(err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.user_id);

    if (!user) {
      res.status(400).json("User does not exist!");
      return;
    }

    await user.update({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone_number: req.body.phone_number,
    });

    res.json(user);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(409).json(err.errors[0].message);
    } else {
      res.json.err;
    }
  }
};

const changePassword = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.user_id);

    if (!user) {
      res.status(400).json("User does not exist!");
      return;
    }

    console.log(user.password);

    // If the request was sent by the user himself then we compare the
    // "old_password" field with the actual user's password.
    if (req.params.user_id === req.session.user_id) {
      if (!req.body.old_password) {
        const err = new Error("Old password is needed");
        err.statusCode = 400;
        throw err;
      }

      await bcrypt
        .compare(req.body.old_password, user.password)
        .then((match) => {
          if (!match) {
            const err = new Error("Passwords don't match!");
            err.statusCode = 400;
            throw err;
          }
        });

      console.log("comparaison ended");
    }

    // Either the request was sent by the user and the passwords match
    // Or the request was sent by an admin.
    let new_password;
    await bcrypt.hash(req.body.new_password, 10).then((hash) => {
      new_password = hash;
    });

    await user.update({
      password: new_password,
    });

    res.json("Password changed successfully");
  } catch (err) {
    res.status(err.statusCode).json(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.user_id);
    if (!user) {
      res.status(400).json("User does not exist");
      return;
    }

    console.log("User exists, deleteing all his sessions...");

    // If the the user is deleting his own account (not an admin)
    // then the session data is cleared and cookie is deleted from the browser
    if (req.params.user_id === req.session.user_id) {
      req.session.destroy();
      res.clearCookie("sessionID", { path: "/" });
    }

    await sessionService.deleteAllUserSessions(user.user_id, (err, message) => {
      if (err) {
        console.error("Failed to delete sessions: ", err);
      } else {
        console.log(message);
      }
    });

    console.log("Sessions deleted, deleting the user from the database...");
    await user.destroy();

    res.json("User successfully deleted");
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByID,
  getUserByEmail,
  getCurrentUser,
  changePassword,
  deleteUser,
  updateUser,
};
