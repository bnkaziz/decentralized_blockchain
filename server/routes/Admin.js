const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const userExists = require("../middlewares/user");
const middlewaresErrors = require("../middlewares/error");

router.post("/sign-up", userExists, adminController.adminSignUp);

router.use(middlewaresErrors);

module.exports = router;
