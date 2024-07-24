const Blog = require("../models/Blog");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create new blog
exports.createBlog = async (req, res) => {
  try {
    // fetch data from body
    const { title, blogText, summary } = req.body;
    const thumbnail = req.files.thumbnailImage;
    const userId = req.user.id;

    //   data validation
    if (!title || !blogText || !summary || !thumbnail) {
      return res.status(403).json({
        success: false,
        message: "All field are required",
      });
    }

    //   upload image to cloudinary
    const thumnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //   create a entry for blog
    const newBlog = await Blog.create({
      title,
      blogText,
      summary,
      creator: userId,
      thumbnail: thumnailImage.secure_url,
    });

    //   add blog to the user model
    await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { blogs: newBlog._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Blog Created Successfully",
      data: newBlog,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Could not create a blog",
    });
  }
};

// update blog
exports.updateBlog = async (req, res) => {
  try {
    // fetch data from body
    const { title, blogText, summary, blogId } = req.body;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (title !== undefined) {
      blog.title = title;
    }
    if (blogText !== undefined) {
      blog.blogText = blogText;
    }
    if (summary !== undefined) {
      blog.summary = summary;
    }
    if (req.files && req.files.image !== undefined) {
      const thumbnail = req.files.thumnailImage;
      const thumbnailDetails = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      blog.thumbnail = thumbnailDetails.secure_url;
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated Successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all blog
exports.getAllBlog = async (req, res) => {
  try {
    const allBlogs = await Blog.find().populate("creator").exec();

    return res.status(200).json({
      success: true,
      message: "Data for all blog fetched successfully",
      data: allBlogs,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch all blog",
    });
  }
};

// delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    // fetch blog id
    const { blogId } = req.body;
    console.log(req.body);
    // validation
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    // remove the blog form user
    const user = await User.findByIdAndUpdate(req.user.id, {
      $pull: { blogs: blogId },
    });

    // delete the blog
    await Blog.findByIdAndDelete(blogId);
    return res.status(200).json({
      success: true,
      message: "Blog has been deleted",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Some error while deleting the blog",
    });
  }
};
