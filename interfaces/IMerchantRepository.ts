import { IMerchant } from './IMerchant';

export interface IMerchantRepository {
  getAllMerchants(): Promise<IMerchant[] | null>;
  getMerchantById(id: number): Promise<IMerchant | null>;
  getMerchantByEmail(emailAddress: string): Promise<IMerchant | null>;
  saveMerchant(merchant: IMerchant): Promise<void>;
  removeMerchant(id: number): Promise<void>;
}
