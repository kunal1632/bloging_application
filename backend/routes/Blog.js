const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const {
  createBlog,
  updateBlog,
  getAllBlog,
  getBlogById,
  deleteBlog,
} = require("../controllers/Blog");

// for creating new blog
router.post("/create-blog", auth, createBlog);

//  update blog
router.post("/update-blog", auth, updateBlog);

// fetch all blogs
router.get("/get-all-blog", auth, getAllBlog);

// fetch blog by id
router.post("/get-blog", auth, getBlogById);

// delete a blog
router.delete("/delete-blog", auth, deleteBlog);

module.exports = router;
