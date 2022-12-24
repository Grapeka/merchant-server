import { Router } from 'express';
import * as menuController from '../controllers/menuController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', menuController.getAllMenuItems);
router.get('/:id', menuController.getMenuItemById);
router.post(
  '/merchant',
  authMiddleware,
  menuController.getMenuItemsByMerchantId
);

export default router;
