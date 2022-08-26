import { model, Schema, Document } from "mongoose";

interface ICreateUser extends Document {
  usernmae: string;
  email: string;
  password: string;
  telefone: string;
  admin: boolean;
}

const CreateUserSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    telefone: String,
    admin: Boolean,
  },
  {
    timestamps: true,
  }
);

export default model<ICreateUser>("User", CreateUserSchema);
