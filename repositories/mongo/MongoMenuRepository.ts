import { IMenuItem } from '../../interfaces/IMenuItem';
import { IMenuRepository } from '../../interfaces/IMenuRepository';
import { MenuItemModel } from '../../models/MenuItemModel';

export class MongoMenuRepository implements IMenuRepository {
  private menuItemModel: MenuItemModel;

  constructor(menuItemModel: MenuItemModel) {
    this.menuItemModel = menuItemModel;
  }

  async createMenuItem(menuItem: IMenuItem): Promise<void> {
    this.menuItemModel.model.create(menuItem);
  }

  async getAllMenuItems(): Promise<IMenuItem[] | null> {
    return this.menuItemModel.model.find().populate('ownerId');
  }

  async getMenuItemsByPage(page: number): Promise<IMenuItem[] | null> {
    return this.menuItemModel.model
      .find()
      .skip(15 * (page - 1))
      .limit(15)
      .populate('ownerId');
  }

  async getMenuItemsCount(): Promise<number> {
    return this.menuItemModel.model.countDocuments();
  }

  async getMenuItemById(id: number): Promise<IMenuItem | null> {
    return this.menuItemModel.model.findOne({ id });
  }

  async getMenuItemsByOwnerId(ownerId: number): Promise<IMenuItem[] | null> {
    return this.menuItemModel.model.find({ ownerId }).populate('ownerId');
  }

  async saveMenuItem(menuItem: IMenuItem): Promise<void> {
    this.menuItemModel.model.create(menuItem);
  }

  async removeMenuItem(id: number): Promise<void> {}
}
