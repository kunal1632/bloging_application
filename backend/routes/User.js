const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

// import required controllers
const { login, signup, changePassword } = require("../controllers/Auth");

// routes for login signup and password change

// route for user login
router.post("/login", login);

// route for user signup
router.post("/signup", signup);

// route for change password
router.post("/changepassword", auth, changePassword);

module.exports = router;
