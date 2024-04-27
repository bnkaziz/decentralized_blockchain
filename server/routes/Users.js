const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const userController = require("../controllers/user");
const middlewaresErrors = require("../middlewares/error");
const sameUser = require("../middlewares/sameUser");

//Get all users in the db
router.route("/").get(userController.getAllUsers);

// Get current user
router.get("/current", authenticate, userController.getCurrentUser);

// Get user by ID
router.get("/:user_id", userController.getUserByID);

// Update a user's balance by ID
// THIS SHOULD BE PERFORMED **ONLY BY AN ADMIN
router.patch(
  "/:user_id/update-balance",
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

router.patch("/edit", authenticate, sameUser, userController.updateUser);

router.delete("/delete", userController.deleteUser);

router.use(middlewaresErrors);

module.exports = router;
