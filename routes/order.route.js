import express from 'express';
import controller from '../controllers/order.controller.js';
import {protect} from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post('/', controller.createOrder);
router.get('/', controller.getOrders);
router.get('/:id',  controller.getOrderById);
router.put('/:id',  controller.updateOrder);
router.delete('/:id',  controller.deletedOrder);

export default router;
