const { Users } = require("../models");
const sessionService = require("../services/session");

const getAllUsers = async (req, res) => {
  const allUsers = await Users.findAll();

  res.json(allUsers);
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
    if (req.body.user_id === req.session.user_id) {
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
  getUserByID,
  getUserByEmail,
  getCurrentUser,
  deleteUser,
  updateUser,
};
