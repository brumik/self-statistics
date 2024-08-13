import  { HydratedDocument, Schema, model, models } from  "mongoose";

export interface IUser {
  username: string;
  password: string;
}

export interface IUserHydrated extends HydratedDocument<Omit<IUser, 'password'>> {};

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please provide an username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide an username"],
  }
});

export const User = models.User || model<IUser>('User', userSchema);
