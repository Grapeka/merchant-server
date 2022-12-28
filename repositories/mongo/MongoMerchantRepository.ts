import { IMerchant } from '../../interfaces/IMerchant';
import { IMerchantRepository } from '../../interfaces/IMerchantRepository';
import { MerchantModel } from '../../models/MerchantModel';

export class MongoMerchantRepository implements IMerchantRepository {
  private merchantModel: MerchantModel;

  constructor() {
    this.merchantModel = MerchantModel.getInstance();
  }

  async getAllMerchants(): Promise<IMerchant[] | null> {
    return this.merchantModel.model.find();
  }

  async getMerchantById(id: number): Promise<IMerchant | null> {
    return this.merchantModel.model.findOne({ id });
  }

  async getMerchantByEmail(email: string): Promise<IMerchant | null> {
    return this.merchantModel.model.findOne({ email });
  }

  async saveMerchant(merchant: IMerchant): Promise<void> {
    this.merchantModel.model.create(merchant);
  }

  async removeMerchant(id: number): Promise<void> {
    this.merchantModel.model.deleteOne({ id });
  }
}
