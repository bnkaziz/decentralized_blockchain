const { Users } = require("../models");
const sessionService = require("../services/session");

const getAllUsers = async (req, res) => {
  const allUsers = await Users.findAll();

  res.json(allUsers);
};

const getUserByID = async (req, res) => {
  const user = await Users.findByPk(req.params.user_id);

  res.json(user);
};

const getUserByEmail = async (req, res) => {
  const email = req.body.email;
  const user = await Users.findOne({
    where: {
      email: email,
    },
  });

  res.json(user);
};

const getCurrentUser = async (req, res) => {
  console.log("current");
  const user = await Users.findByPk(req.session.user_id);

  res.json(user);
};

const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.body.user_id);
    if (user) {
      sessionService.deleteAllUserSessions(user.user_id, (err, message) => {
        if (err) {
          console.error("Failed to delete sessions: ", err);
        } else {
          console.log(message);
        }
      });
      await user.destroy();
      res.json("User successfully deleted");
    }
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
};
