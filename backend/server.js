require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const plantRoutes = require("./routes/plants");
const commentRoutes = require("./routes/comments");
const adRoutes = require("./routes/ads");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/ads", adRoutes);

// // WORKING but crashes when link is wrong
// app.post("/upload-by-link", async (req, res) => {
//   const { link } = req.body;
//   const newName = "photo" + Date.now() + ".jpg";

//   await imageDownloader.image({
//     url: link,
//     dest: __dirname + "/uploads/" + newName,
//   });
//   res.json(newName);
// });

app.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";

    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName);
  } catch (error) {
    res.status(500).json({ error: "Failed to download image." });
  }
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    // prettier-ignore
    uploadedFiles.push(newPath.replace('uploads\\', ''));
  }
  res.json(uploadedFiles);
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log("Connected to MongoDB and listening on port 4000...");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// // listen for request
// app.listen(process.env.PORT, () => {
//   console.log("Listening on port 4000...");
// });
