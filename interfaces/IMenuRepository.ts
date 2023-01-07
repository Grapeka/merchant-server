import { IMenuItem } from './IMenuItem';

export interface IMenuRepository {
  createMenuItem(menuItem: IMenuItem): Promise<void>;
  getAllMenuItems(): Promise<IMenuItem[] | null>;
  getMenuItemById(id: number): Promise<IMenuItem | null>;
  getMenuItemsByOwnerId(ownerId: number): Promise<IMenuItem[] | null>;
  saveMenuItem(menuItem: IMenuItem): Promise<void>;
  removeMenuItem(id: number): Promise<void>;
}
