import { IMenuItem } from '../interfaces/IMenuItem';
import { MongoMenuRepository } from '../repositories/mongo/MongoMenuRepository';
import { MenuService } from '../services/MenuService';
import { MenuItemModel } from '../models/MenuItemModel';
import { Request, Response } from 'express';

const menuItemModel = MenuItemModel.getInstance();
const mongoMenuRepository = new MongoMenuRepository(menuItemModel);
const mongoMenuService = new MenuService(mongoMenuRepository);

export class MenuController {
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

// export const getAllMenuItems = async (
//   req: Request,
//   res: Response
// ): Promise<Response<IMenuItem[]>> => {
//   const menuItems = await mongoMenuService.getAllMenuItems();
//   return res.json(menuItems);
// };

// export const getMenuItemById = async (
//   req: Request,
//   res: Response
// ): Promise<Response<IMenuItem>> => {
//   const { id } = req.params;

//   const menuItem = await mongoMenuService.getMenuItemById(parseInt(id));

//   if (menuItem === undefined || menuItem === null) {
//     return res.sendStatus(404);
//   }

//   return res.json(menuItem);
// };

// export const getMenuItemsByMerchantId = async (
//   req: Request | any,
//   res: Response
// ): Promise<Response<IMenuItem | IMenuItem[] | any>> => {
//   const merchantId = req.user.id;

//   if (req.user.id !== parseInt(merchantId)) {
//     return res.sendStatus(403);
//   }

//   const menuItems = await mongoMenuService.getMenuItemsByOwnerId(merchantId);

//   if (menuItems === null || menuItems === undefined) {
//     return res.sendStatus(404);
//   }

//   if (menuItems.length) {
//     return res.sendStatus(404);
//   }
//   return res.json(menuItems);
// };
