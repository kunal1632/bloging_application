import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadThumbnail = ({
  name,
  register,
  setValue,
  errors,
  editBlog = null,
  editData = null,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(editBlog ? editData : "");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop,
  });

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  return (
    <div
      className={`${
        isDragActive
          ? "bg-white dark:bg-slate-900"
          : "bg-white_bg dark:bg-slate-950"
      } flex h-[300px] flex-col gap-3 items-center w-full rounded-lg  focus:outline-0 border-[2px] dark:border-slate-800`}
    >
      {previewSource ? (
        <div className="w-full h-full relative flex flex-col items-center">
          <img
            src={previewSource}
            alt="Preview"
            className="w-full h-[calc(100%-2.5rem)] rounded-md object-cover"
          />

          <button
            type="button"
            className="mt-2 bg-slate-300 px-3 py-1 text-sm rounded-lg cursor-pointer"
            onClick={() => {
              setPreviewSource("");
              setSelectedFile(null);
              setValue(name, null);
            }}
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          className="cursor-pointer w-full h-full flex flex-col gap-5 items-center justify-center"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p className="mt-2 text-center text-slate-400 text-richblack-200">
            Select or Drop your thumbnail here
          </p>
          <p className="flex items-center justify-center px-4 py-2 bg-slate-300 rounded-lg dark:bg-slate-200 cursor-pointer hover:opacity-80 transition-all duration-200">
            Choose
          </p>
          {errors[name] && (
            <span className="ml-2 text-sm text-red-500 tracking-wide">
              {name} is required
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadThumbnail;
