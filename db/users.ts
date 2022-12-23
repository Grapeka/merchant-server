export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const users: User[] = [
  {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'bro@gmail.com',
    password: '123456',
  },
  {
    id: 2,
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'sis@gmail.com',
    password: '123456',
  },
  {
    id: 3,
    firstname: 'Jack',
    lastname: 'Doe',
    email: 'litbro@gmail.com',
    password: '123456',
  },
];

export default users;
