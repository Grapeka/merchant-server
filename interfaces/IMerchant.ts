import mongoose from 'mongoose';

export interface IMerchant {
  _id?: any;
  name: string;
  email: string;
  password: string;
  facebook: string;
  instagram: string;
}
