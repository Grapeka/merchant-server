import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
const router = Router();

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.post('/user', authMiddleware, authController.getUser);

export default router;
