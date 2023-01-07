import { IMenuItem } from '../interfaces/IMenuItem';
import { MongoMenuRepository } from '../repositories/mongo/MongoMenuRepository';
import { MenuService } from '../services/MenuService';
import { MenuItemModel } from '../models/MenuItemModel';
import { Request, Response } from 'express';
import crypto from 'crypto';

const menuItemModel = MenuItemModel.getInstance();
const mongoMenuRepository = new MongoMenuRepository(menuItemModel);
const mongoMenuService = new MenuService(mongoMenuRepository);

export class MenuController {
  createMenuItem(req: Request | any, res: Response): Response<IMenuItem> {
    const merchantId = req.user.id;

    const { name, description, price, ownerId, category, image } = req.body;

    if (merchantId !== ownerId) {
      return res.sendStatus(403);
    }
    const id = crypto.randomUUID();

    if (
      id === undefined ||
      name === undefined ||
      description === undefined ||
      price === undefined ||
      ownerId === undefined ||
      category === undefined ||
      image === undefined ||
      image === ''
    ) {
      return res.sendStatus(400);
    }

    const menuItem = { id, name, description, price, ownerId, category, image };

    mongoMenuService.createMenuItem(menuItem as IMenuItem);

    return res.json(menuItem);
  }
  async getAllMenuItems(
    req: Request,
    res: Response
  ): Promise<Response<IMenuItem[]>> {
    const menuItems = await mongoMenuService.getAllMenuItems();
    return res.json(menuItems);
  }

  async getMenuItemById(
    req: Request,
    res: Response
  ): Promise<Response<IMenuItem>> {
    const { id } = req.params;

    const menuItem = await mongoMenuService.getMenuItemById(parseInt(id));

    if (menuItem === undefined || menuItem === null) {
      return res.sendStatus(404);
    }

    return res.json(menuItem);
  }

  async getMenuItemsByMerchantId(
    req: Request | any,
    res: Response
  ): Promise<Response<IMenuItem | IMenuItem[] | any>> {
    const merchantId = req.user.id;

    const menuItems = await mongoMenuService.getMenuItemsByOwnerId(merchantId);

    return res.json(menuItems);
  }
}
