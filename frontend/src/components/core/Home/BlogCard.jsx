import React from "react";
import { formattedDate } from "../../../utils/formatDate";
import TruncateText from "../../common/TruncateText";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  return (
    <div
      className="border-[1px] rounded-lg w-full flex-col md:flex-row p-5 dark:border-slate-600 flex gap-5 border-slate-400 cursor-pointer hover:bg-slate-200 transition-all duration-200 hover:dark:bg-slate-900"
      onClick={() => navigate(`/post/${blog._id}`)}
    >
      <div className="flex-shrink-0 mx-auto md:m-0">
        <img
          src={blog?.thumbnail}
          className="object-cover md:w-[200px] md:h-[200px] w-[300px] h-[250px] rounded-lg"
        />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <p className="text-xl dark:text-white font-semibold">
          <TruncateText text={blog.title} maxLength={50} />
        </p>
        <div className="flex gap-5">
          <p className="text-slate-500 text-sm">
            {blog.creator.firstName} {blog.creator.lastName}
          </p>
          <p className="text-slate-500 text-sm ">
            {formattedDate(blog.createdAt)}
          </p>
        </div>

        <p className="dark:text-slate-200 text-slate-900">
          <TruncateText text={blog.summary} maxLength={250} />
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
