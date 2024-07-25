import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById } from "../services/operations/blogAPI";
import { useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { formattedDate } from "../utils/formatDate";

const ViewPost = () => {
  const { blogId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [blog, setblog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getBlogById(blogId, token);
        setblog(res);
      } catch (error) {
        console.log("Errorr while geting blog data");
      }
      setLoading(false);
    })();
  }, [blogId, token]);

  if (loading) {
    return (
      <div className="flex w-full h-[calc(100vh-4rem)] items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-11/12 md:w-2/3 mx-auto mt-10 flex flex-col gap-3">
      <div>
        <p
          onClick={() => navigate(-1)}
          className="flex text-xs gap-1
         items-center text-slate-500 hover:text-opacity-60 dark:hover:text-opacity-80 w-fit  transition-all duration-200 cursor-pointer "
        >
          <IoMdArrowRoundBack />
          Go Back
        </p>
      </div>

      <div>
        <h1 className="text-4xl font-semibold dark:text-white">
          {blog?.title}
        </h1>
        <div className="flex justify-between items-center text-slate-500 text-sm mt-2">
          <p>
            {blog?.creator?.firstName} {blog?.creator?.lastName}
          </p>
          <p>{formattedDate(blog?.createdAt)}</p>
        </div>
      </div>

      <div className="w-full max-h-[500px] overflow-hidden">
        <img
          src={blog?.thumbnail}
          alt={blog?.title}
          className=" object-cover object-center h-[500px] w-full rounded-xl"
        />
      </div>

      <div className="w-full mx-auto">
        <div
          className="prose  dark:prose-invert mt-5 min-w-full mx-auto "
          dangerouslySetInnerHTML={{ __html: blog?.blogText }}
        />
      </div>
      <div className="flex justify-center my-3 mb-5">
        <p className="text-slate-500">End of the Blog</p>
      </div>
    </div>
  );
};

export default ViewPost;
