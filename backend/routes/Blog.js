const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const {
  createBlog,
  updateBlog,
  getAllBlog,
  deleteBlog,
} = require("../controllers/Blog");

// for creating new blog
router.post("/create-blog", auth, createBlog);

//  update blog
router.post("/update-blog", auth, updateBlog);

// for creating new blog
router.get("/get-all-blog", auth, getAllBlog);

// for creating new blog
router.delete("/delete-blog", auth, deleteBlog);

module.exports = router;
