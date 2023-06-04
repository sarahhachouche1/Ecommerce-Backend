import express from 'express';
import controller from '../controllers/itemOrder.controller.js';
import { protect } from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post('/', protect, controller.createItemOrder);
router.get('/', protect, controller.getItemOrders);
router.get('/:id', protect, controller.getItemOrderById);
router.put('/:id', protect, controller.updateItemOrder);
router.delete('/:id', protect, controller.deletedItemOrder);

export default router;