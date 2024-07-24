const User = require("../models/User");
const Blog = require("../models/Blog");

// get all user data with blogs
exports.getUserData = async (req, res) => {
  try {
    // get user id from the req
    const id = req.user.id;

    // get user data
    const userData = await User.findById(id).populate("blogs").exec();

    return res.status(200).json({
      success: true,
      message: "Fetched all user data",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot fetch user data",
    });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    // get id
    const id = req.user.id;
    // validation
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // delete blogs
    const allUserBlogs = userDetails.blogs;
    for (blog in allUserBlogs) {
      await Blog.findByIdAndDelete(blog);
    }

    // delete user
    await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ sucess: true, message: "User has been deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete the user" });
  }
};
