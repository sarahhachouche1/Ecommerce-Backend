const router = express.Router();
import express from "express";
import multer from "multer";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

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
  .get(getServices)
  .post(uploadMiddlewares.single("image_url"), createService);

router
  .route("/:id")
  .put(uploadMiddlewares.single("image_url"), updateService)
  .delete(deleteService)
  .get(getServiceById);

export default router;
