const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

// import required controllers
const { getUserData, deleteUser } = require("../controllers/User");

// getuser details
router.get("/userdetials", auth, getUserData);

// deleteuser route
router.delete("/deleteuser", auth, deleteUser);

module.exports = router;
