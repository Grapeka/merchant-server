import { IMenuItem } from '../../interfaces/IMenuItem';
import { IMenuRepository } from '../../interfaces/IMenuRepository';
import { MenuItemModel } from '../../models/MenuItemModel';

export class MongoMenuRepository implements IMenuRepository {
  private menuItemModel: MenuItemModel;

  constructor(menuItemModel: MenuItemModel) {
    this.menuItemModel = menuItemModel;
  }

  async getAllMenuItems(): Promise<IMenuItem[] | null> {
    return this.menuItemModel.model.find();
  }

  async getMenuItemById(id: number): Promise<IMenuItem | null> {
    return this.menuItemModel.model.findOne({ id });
  }

  async getMenuItemsByOwnerId(ownerId: number): Promise<IMenuItem[] | null> {
    return this.menuItemModel.model.find({ ownerId });
  }

  async saveMenuItem(menuItem: IMenuItem): Promise<void> {
    this.menuItemModel.model.create(menuItem);
  }

  async removeMenuItem(id: number): Promise<void> {}
}
