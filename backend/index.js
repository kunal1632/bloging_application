const express = require("express");
const app = express();

const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
dotenv.config();

const PORT = process.env.PORT || 4000;
// connect database
database.connect();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// connect cloudinary
cloudinaryConnect();

// routes

// default route
app.get("/", (req, res) => {
  return res.json({ success: true, message: "Your server is running" });
});

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
