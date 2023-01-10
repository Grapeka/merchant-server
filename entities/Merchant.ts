import * as bcrypt from 'bcrypt';
import { IValidationError } from '../interfaces/IValidationError';

export class Merchant {
  private name: string;
  private email: string;
  private password: string;
  private facebook: string;
  private instagram: string;

  constructor(
    name: string,
    email: string,
    password: string,
    facebook: string,
    instagram: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.facebook = facebook;
    this.instagram = instagram;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getFacebook(): string {
    return this.facebook;
  }

  getInstagram(): string {
    return this.instagram;
  }

  setName(name: string): void {
    this.name = name;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  setFacebook(facebook: string): void {
    this.facebook = facebook;
  }

  setInstagram(instagram: string): void {
    this.instagram = instagram;
  }

  public hashPassword(password: string): string {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
  }

  public checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  public validate(): IValidationError[] | null {
    const errors: IValidationError[] = [];

    if (!this.name) {
      errors.push({ field: 'name', message: 'Name is required' });
    }

    if (!this.email) {
      errors.push({ field: 'email', message: 'Email is required' });
    }

    if (!this.password) {
      errors.push({ field: 'password', message: 'Password is required' });
    }

    console.log(errors);

    return errors.length > 0 ? errors : null;
  }
}
