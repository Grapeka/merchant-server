import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/signin', authController.generateToken);
router.post('/signup', authController.register);
router.post('/user', authMiddleware, authController.getUser);

export default router;
