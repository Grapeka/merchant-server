import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { AuthController } from '../controllers/authController';
const router = Router();

const authController = new AuthController();

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.post('/user', authMiddleware, authController.getUser);

export default router;
