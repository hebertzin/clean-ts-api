import { model, Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {}

const schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const User: IUserModel = model<IUser, IUserModel>('user', schema);
