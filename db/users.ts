export interface IMerchant {
  id: number;
  name: string;
  email: string;
  password: string;
  facebook: string;
  instagram: string;
}

const merchants: IMerchant[] = [
  {
    id: 1,
    name: 'Bakery125',
    email: 'bk@gmail.com',
    password: '123456',
    facebook: 'https://www.facebook.com/bakery125',
    instagram: 'https://www.instagram.com/bakery125',
  },
  {
    id: 2,
    name: 'Pizza123',
    email: 'pizza123@gmail.com',
    password: '123456',
    facebook: 'https://www.facebook.com/pizza123',
    instagram: 'https://www.instagram.com/pizza123',
  },
  {
    id: 3,
    name: 'Burger456',
    email: 'burger456@gmil.com',
    password: '123456',
    facebook: 'https://www.facebook.com/burger456',
    instagram: 'https://www.instagram.com/burger456',
  },
];

export default merchants;
