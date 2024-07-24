import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBlog } from "../../../slices/blogSlice";
import toast from "react-hot-toast";
import UploadThumbnail from "./UploadThumbnail";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createBlog, updateBlog } from "../../../services/operations/blogAPI";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

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
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editBlog) {
      setValue("blogTitle", blog.title);
      setValue("blogText", blog.blogText);
      setValue("summary", blog.summary);
      setValue("thumbnail", blog.thumbnail);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.blogTitle !== blog.title ||
      currentValues.blogText !== blog.blogText ||
      currentValues.summary !== blog.summary ||
      currentValues.thumbnail !== blog.thumbnail
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (data) => {
    if (getValues("blogText") === "<p><br></p>") {
      return;
    }
    if (editBlog) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("blogId", blog?._id);
        if (currentValues.blogTitle !== blog.title) {
          formData.append("title", data.blogTitle);
        }
        if (currentValues.blogText !== blog.text) {
          formData.append("blogText", data.blogText);
        }
        if (currentValues.summary !== blog.summary) {
          formData.append("summary", data.summary);
        }
        if (currentValues.thumbnail !== blog.thumbnail) {
          formData.append("thumbnailImage", data.thumbnail);
        }
        setLoading(true);
        const result = await updateBlog(formData, token);
        setLoading(false);
        if (result) {
          navigate(`/post/${result._id}`);
          return;
        }
      } else {
        toast.error("There are no changes in the blog");
        return;
      }
    } else {
      // new blog
      const formData = new FormData();
      formData.append("title", data.blogTitle);
      formData.append("blogText", data.blogText);
      formData.append("summary", data.summary);
      formData.append("thumbnailImage", data.thumbnail);

      setLoading(true);
      const result = await createBlog(formData, token);
      console.log(result);
      if (result) {
        dispatch(setBlog(result));
        navigate(`/post/${result?._id}`);
      }
      setLoading(false);
    }
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

      <div>
        <Controller
          name="blogText"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ReactQuill
              {...field}
              modules={modules}
              formats={formats}
              onChange={(content, delta, source, editor) => {
                field.onChange(editor.getHTML());
              }}
            />
          )}
        />
        {(errors.blogText || getValues("blogText") === "<p><br></p>") && (
          <span className="ml-2 text-sm text-red-500">Content is required</span>
        )}
      </div>
      <div className="flex justify-center md:justify-end gap-5 items-center">
        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
          className=" bg-slate-300 text-black md:w-24 w-1/2 rounded-lg  px-5 py-2 cursor-pointer hover:opacity-80 transition-all duration-200 md:text-lg"
        >
          Cancel
        </button>
        <button
          className=" bg-primary rounded-lg md:w-24 w-1/2 py-2 text-white cursor-pointer hover:opacity-80 transition-all duration-200 md:text-lg"
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
