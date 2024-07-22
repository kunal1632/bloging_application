import React from "react";

const CreatePost = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="w-full flex flex-col items-center mt-10 gap-2">
        <p className="text-2xl md:text-3xl font-semibold dark:text-white">
          Create your own blog
        </p>
        <p className="text-xs md:text-base text-slate-500 dark:text-slate-400">
          Write what should not be forgotten.
        </p>
      </div>
    </div>
  );
};

export default CreatePost;
