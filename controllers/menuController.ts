import menu, { IMenu } from '../db/menu';
import { Request, Response } from 'express';

export const getAllMenuItems = async (
  req: Request,
  res: Response
): Promise<Response<IMenu[]>> => {
  return res.json(menu);
};

export const getMenuItemById = async (
  req: Request,
  res: Response
): Promise<Response<IMenu>> => {
  const { id } = req.params;
  const menuItem = menu.find((item) => item.id === parseInt(id));

  if (menuItem === undefined) {
    return res.sendStatus(404);
  }

  return res.json(menuItem);
};

export const getMenuItemsByMerchantId = async (
  req: Request | any,
  res: Response
): Promise<Response<IMenu | IMenu[]>> => {
  const { id } = req.params;

  if (req.user.id !== parseInt(id)) {
    return res.sendStatus(403);
  }

  const menuItems = menu.filter((item) => item.ownerId === parseInt(id));

  if (menuItems.length === 0) {
    return res.sendStatus(404);
  }

  return res.json(menuItems);
};
