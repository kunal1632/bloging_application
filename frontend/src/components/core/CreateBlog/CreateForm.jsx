import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBlog } from "../../../slices/blogSlice";
import toast from "react-hot-toast";
import UploadThumbnail from "./UploadThumbnail";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateForm = () => {
  const { token } = useSelector((state) => state.auth);
  const { blog, editBlog } = useSelector((state) => state.blog);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editBlog) {
      setValue("blogTitle", blog.title);
      setValue("blogText", blog.text);
      setValue("summary", blog.summary);
      setValue("thumbnail", blog.thumbnail);
    }
  }, []);

  const idFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.blogTitle !== blog.title ||
      currentValues.blogText !== blog.text ||
      currentValues.summary !== blog.summary ||
      currentValues.thumbnail !== blog.thumbnail
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (data) => {
    if (editBlog) {
      if (idFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("blogId", blog?._id);
        if (currentValues.blogTitle !== blog.title) {
          formData.append("blogTitle", data.blogTitle);
        }
        if (currentValues.blogText !== blog.text) {
          formData.append("blogText", data.blogText);
        }
        if (currentValues.summary !== blog.summary) {
          formData.append("summary", data.summary);
        }
        if (currentValues.thumbnail !== blog.thumbnail) {
          formData.append("thumbnail", data.thumbnail);
        }
        // setLoading(true);
        // const result = await editBlog(formData, token);
        // setLoading(false);
        // if (result) {
        //   dispatch(setBlog(result));
        // } else {
        //   toast.error("There are no changes in the blog");
        // }
      }
    }

    // new blog
    const formData = new FormData();
    formData.append("blogTitle", data.blogTitle);
    formData.append("blogText", data.blogText);
    formData.append("summary", data.summary);
    formData.append("thumbnail", data.thumbnail);

    // setLoading(true);
    // const result = await createBlog(formData, token);
    // if (result) {
    //   dispatch(setBlog(result));
    // }
    // setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-5 flex-col mb-5"
    >
      <div>
        <input
          id="blogTItle"
          placeholder="Title"
          className="w-full rounded-lg py-2 px-5 bg-white_bg dark:bg-slate-950 focus:outline-0 border-[2px] dark:border-slate-800 dark:text-white"
          {...register("blogTitle", { required: true })}
        />
        {errors.blogTitle && (
          <span className="ml-2 text-sm text-red-500">Title is required</span>
        )}
      </div>
      <div>
        <input
          id="summary"
          placeholder="Summary"
          className="w-full rounded-lg py-2 px-5 bg-white_bg dark:bg-slate-950 focus:outline-0 border-[2px] dark:border-slate-800 dark:text-white"
          {...register("summary", { required: true })}
        />
        {errors.blogTitle && (
          <span className="ml-2 text-sm text-red-500">Summary is required</span>
        )}
      </div>

      <UploadThumbnail
        name="thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editBlog={editBlog}
        editData={editBlog ? blog.thumbnail : null}
      />

      <ReactQuill />
    </form>
  );
};

export default CreateForm;
