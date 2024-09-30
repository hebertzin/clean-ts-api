import mongoose from 'mongoose';

export type User = {
  _id?: string | mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
};

export interface IUserRepository {
  create(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User>;
}
