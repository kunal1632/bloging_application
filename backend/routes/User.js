const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

// import required controllers
const { login, signup, changePassword } = require("../controllers/Auth");
const { getUserData, deleteUser } = require("../controllers/User");

// routes for login signup and password change

// route for user login
router.post("/login", login);

// route for user signup
router.post("/signup", signup);

// route for change password
router.post("/changepassword", auth, changePassword);

// getuser details
router.get("/userdetials", auth, getUserData);

// deleteuser route
router.delete("/deleteuser", auth, deleteUser);

module.exports = router;
