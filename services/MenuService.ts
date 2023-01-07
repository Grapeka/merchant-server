import { IMenuRepository } from '../interfaces/IMenuRepository';
import { IMenuItem } from '../interfaces/IMenuItem';

export class MenuService {
  private menuRepository: IMenuRepository;

  constructor(menuRepository: IMenuRepository) {
    this.menuRepository = menuRepository;
  }

  async createMenuItem(menuItem: IMenuItem): Promise<void> {
    return this.menuRepository.createMenuItem(menuItem);
  }

  async getAllMenuItems(): Promise<IMenuItem[] | null> {
    return this.menuRepository.getAllMenuItems();
  }

  async getMenuItemById(id: number): Promise<IMenuItem | null> {
    return this.menuRepository.getMenuItemById(id);
  }

  async getMenuItemsByOwnerId(ownerId: number): Promise<IMenuItem[] | null> {
    return this.menuRepository.getMenuItemsByOwnerId(ownerId);
  }

  async saveMenuItem(menuItem: IMenuItem): Promise<void> {
    return this.menuRepository.saveMenuItem(menuItem);
  }

  async removeMenuItem(id: number): Promise<void> {
    return this.menuRepository.removeMenuItem(id);
  }
}
