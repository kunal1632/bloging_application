import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../services/operations/blogAPI";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../components/core/Home/BlogCard";
import { setLoading } from "../slices/blogSlice";

const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const [allBlogs, setAllBlogs] = useState([]);
  const { loading } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      try {
        const res = await getAllBlogs(token);
        setAllBlogs(res);
      } catch (error) {
        console.log("Error while fetching blogs");
      }
      dispatch(setLoading(false));
    })();
  }, [token]);

  if (loading) {
    return (
      <div className="flex w-full h-[calc(100vh-4rem)] items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div className="w-11/12 md:w-2/3  mx-auto">
      <div className="mt-10 flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl dark:text-white font-semibold">
          Blog Feed
        </h1>
        <p className="  text-slate-500 ">
          Explore blogs writen by other people
        </p>
      </div>

      <div className="w-full mb-5">
        {allBlogs.length === 0 ? (
          <div className="w-full h-full flex items-center mt-36 justify-center">
            <p className="text-2xl dark:text-white">No Blogs Avaliable</p>
          </div>
        ) : (
          <div className="flex  flex-col items-center gap-5  w-full mt-5">
            {allBlogs?.map((blog) => (
              <BlogCard blog={blog} key={blog._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
