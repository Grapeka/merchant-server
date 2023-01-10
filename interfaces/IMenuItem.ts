import mongoose from 'mongoose';

export interface IMenuItem {
  ownerId: string | mongoose.SchemaDefinitionProperty<string>;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}
