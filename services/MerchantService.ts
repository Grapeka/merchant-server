import { IMerchantRepository } from '../interfaces/IMerchantRepository';
import { IMerchant } from '../interfaces/IMerchant';

export class MerchantService {
  private merchantRepository: IMerchantRepository;

  constructor(merchantRepository: IMerchantRepository) {
    this.merchantRepository = merchantRepository;
  }

  async getAllMerchants(): Promise<IMerchant[] | null> {
    return this.merchantRepository.getAllMerchants();
  }

  async getMerchantById(id: number): Promise<IMerchant | null> {
    return this.merchantRepository.getMerchantById(id);
  }

  async getMerchantByEmail(emailAddress: string): Promise<IMerchant | null> {
    return this.merchantRepository.getMerchantByEmail(emailAddress);
  }

  async saveMerchant(merchant: IMerchant): Promise<void> {
    return this.merchantRepository.saveMerchant(merchant);
  }

  async removeMerchant(id: number): Promise<void> {
    return this.merchantRepository.removeMerchant(id);
  }
}
