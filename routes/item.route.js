import express from 'express';
import controller from '../controllers/item.controller.js';
// import { protect } from '../middlewares/authMiddleware.js'
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const uploadMiddlewares = multer({
    storage,
});


router.post('/', uploadMiddlewares.single("image_url"), controller.createItem);



router.get('/', controller.getItems);
router.get('/:id', controller.getItemById);
router.put('/:id', uploadMiddlewares.single("image_url"), controller.updateItem);
router.delete('/:id', controller.deletedItem);

export default router;
