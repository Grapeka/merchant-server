import mongoose from 'mongoose';
import { IMerchant } from '../interfaces/IMerchant';

export const merchantSchema: mongoose.Schema<IMerchant> = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  facebook: { type: String, required: true },
  instagram: { type: String, required: true },
});

export class MerchantModel {
  private static instance: MerchantModel;
  public model: mongoose.Model<IMerchant>;

  private constructor() {
    this.model = mongoose.model('Merchant', merchantSchema);
  }

  public static getInstance(): MerchantModel {
    if (!MerchantModel.instance) {
      MerchantModel.instance = new MerchantModel();
    }

    return MerchantModel.instance;
  }
}
