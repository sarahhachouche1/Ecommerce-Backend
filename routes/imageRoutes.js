const router = express.Router();
import express from "express";
import multer from "multer";
import {
  getImages,
  createImage,
  updateImage,
  deleteImage,
} from "../controllers/imageController.js";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadMiddlewares = multer({
  storage,
});

router
  .route("/")
  .get(getImages)
  .post(uploadMiddlewares.single("image_url"), createImage);

router
  .route("/:id")
  .put(uploadMiddlewares.single("image_url"), updateImage)
  .delete(deleteImage);

export default router;
