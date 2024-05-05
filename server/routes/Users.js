const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const userController = require("../controllers/user");
const middlewaresErrors = require("../middlewares/error");
const sameUser = require("../middlewares/sameUser");
const adminOrSameUser = require("../middlewares/adminOrSameUser");
const userExists = require("../middlewares/user");

//Get all users in the db
router.route("/").get(userController.getAllUsers);

// Register a user (by an admin).
router.post(
  "/register_user",
  authenticate,
  authorize,
  userExists,
  userController.createUser
);

// Get current user
router.get("/current", userController.getCurrentUser);

// Get user by ID
router.get("/:user_id", userController.getUserByID);

// Update a user's balance by ID
// THIS SHOULD BE PERFORMED **ONLY BY AN ADMIN
router.patch(
  "/update-balance/:user_id",
  authenticate,
  authorize,
  async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const balance = req.body.balance;

      await Users.update(
        { balance: balance },
        {
          where: {
            user_id: user_id,
          },
        }
      );

      const user = await Users.findByPk(req.params.user_id);
      res.json(user);
    } catch (err) {
      res.json(err);
    }
  }
);

// Change User's Password (by the user or by an admin).
router.patch(
  "/change_password/:user_id",
  authenticate,
  adminOrSameUser,
  userController.changePassword
);

router.patch(
  "/edit/:user_id",
  authenticate,
  sameUser,
  userController.updateUser
);

// Delete a user (by the user or by an admin).
router.delete("/delete/:user_id", adminOrSameUser, userController.deleteUser);

router.use(middlewaresErrors);

module.exports = router;
