import { IMenuItem } from './IMenuItem';

export interface IMenuRepository {
  getAllMenuItems(): Promise<IMenuItem[] | null>;
  getMenuItemById(id: number): Promise<IMenuItem | null>;
  getMenuItemsByOwnerId(ownerId: number): Promise<IMenuItem[] | null>;
  saveMenuItem(menuItem: IMenuItem): Promise<void>;
  removeMenuItem(id: number): Promise<void>;
}
