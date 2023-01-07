import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { MenuController } from '../controllers/menuController';

const router = Router();
const menuController = new MenuController();

router.get('/', menuController.getAllMenuItems);
router.get('/:id', menuController.getMenuItemById);
router.post(
  '/merchant',
  authMiddleware,
  menuController.getMenuItemsByMerchantId
);
router.post('/', authMiddleware, menuController.createMenuItem);

export default router;
