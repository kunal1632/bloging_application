import React from "react";
import CreateForm from "../components/core/CreateBlog/CreateForm";

const CreatePost = () => {
  return (
    <div className="w-11/12 md:w-5/6 lg:w-4/6 mx-auto flex flex-col">
      <div className="w-full flex flex-col items-center mt-10 gap-2">
        <p className="text-2xl md:text-3xl font-semibold dark:text-white">
          Create your own blog
        </p>
        <p className="text-xs md:text-base text-slate-500 dark:text-slate-400">
          Write what should not be forgotten.
        </p>
      </div>

      <div className="w-full mt-10">
        <CreateForm />
      </div>
    </div>
  );
};

export default CreatePost;
