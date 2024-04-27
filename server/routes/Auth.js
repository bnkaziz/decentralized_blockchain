const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const userExists = require("../middlewares/user");
const authenticate = require("../middlewares/authenticate");
const middlewaresErrors = require("../middlewares/error");

router.post("/sign-up", userExists, authController.signUp);

router.post("/login", authController.login);

router.post("/logout", authenticate, authController.logout);

router.use(middlewaresErrors);

module.exports = router;
