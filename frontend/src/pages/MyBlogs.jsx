import React, { useEffect, useState } from "react";
import { getUserData } from "../services/operations/profileAPI";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../components/core/Home/BlogCard";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { setBlog, setEditBlog } from "../slices/blogSlice";
import { deleteBlog } from "../services/operations/blogAPI";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getUserData(token);
        setMyBlogs(res.blogs);
      } catch (error) {
        console.log("Unable to fetch user blogs");
      }
      setLoading(false);
    })();
  }, [loadData, token]);

  const handleEdit = (blog) => {
    dispatch(setBlog(blog));
    dispatch(setEditBlog(true));
    navigate("/create-post");
  };

  const handleDelete = async (blog) => {
    setLoading(true);
    try {
      const res = await deleteBlog({ blogId: blog._id }, navigate, token);
      setLoadData((prevState) => !prevState);
    } catch (error) {
      console.log("Error while deleting blog");
    }
    setLoading(false);
  };
  if (loading) {
    return (
      <div className="flex w-full h-[calc(100vh-4rem)] items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-11/12 md:w-2/3 mx-auto">
      <div className="mt-10 flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl dark:text-white font-semibold ">
          Your Blogs
        </h1>
        <p className="  text-slate-500 ">
          These blogs are created by your and you can edit or delete them
        </p>
      </div>

      <div className="w-full">
        {myBlogs.length === 0 ? (
          <div className="w-full h-full flex items-center mt-36 justify-center">
            <p className="text-2xl dark:text-white">No Blogs Avaliable</p>
          </div>
        ) : (
          <div className="flex  flex-col items-center gap-5  w-full mt-5 mb-5">
            {myBlogs?.map((blog) => (
              <div className="w-full" key={blog._id}>
                <div className=" justify-end w-full flex gap-5 pr-3">
                  <button
                    className="flex gap-1 items-center justify-center text-primary hover:text-opacity-70 transition-all duration-200 cursor-pointer"
                    onClick={() => handleEdit(blog)}
                  >
                    <MdEdit />
                    Edit
                  </button>
                  <button
                    className="flex gap-1 items-center justify-center text-red-600 hover:text-opacity-70 transition-all duration-200 cursor-pointer"
                    onClick={() => {
                      handleDelete(blog);
                    }}
                  >
                    <MdDelete />
                    Delete
                  </button>
                </div>
                <BlogCard blog={blog} key={blog._id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
