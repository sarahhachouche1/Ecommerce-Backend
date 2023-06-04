import express from 'express';
import { createContact } from '../controllers/contactController.js';
import {protect} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/', createContact);

export default router;