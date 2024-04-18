const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router
  .route("/")

  //Get all users in the db
  .get(async (req, res) => {
    const allUsers = await Users.findAll();
    res.json(allUsers);
  })

  // Create a new user
  .post(async (req, res) => {
    const user = req.body;
    const count = await Users.count();

    // CHANGE THE PRIMARY KEY FROM COUNT TO ANOTHER METHODE
    user.user_id = "user_" + (count + 1);
    await Users.create(user);
    res.json(user);
  });

// Get user by ID
router.get("/:user_id", async (req, res) => {
  const user = await Users.findByPk(req.params.user_id);
  res.json(user);
});

// Update a user's balance by ID
// THIS SHOULD BE PERFORMED **ONLY BY AN ADMIN
router.patch("/:user_id/update-balance", async (req, res) => {
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
});

module.exports = router;
