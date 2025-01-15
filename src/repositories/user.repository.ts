import { user } from "../types/documents/user.document";
import { User } from "../models/user.model";
import { userResponse } from "../types/responses/user.response";
import mongoose from "mongoose";
import { generateAuthToken } from "../utils/auth";

export class mainUser {
  constructor() {}
  getUser = async (_id: string) => {
    return User.findById(_id);
  };
  getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email: email });
    const token = generateAuthToken(user);
    return token
  };
  saveUser = async (user: user) => {
    const data: userResponse | any = await User.findOne({
      email: user.email,
    }).exec();

    if (data) {
      return data;
    }

    return new User(user).save();
  };
  updateUser = async (user: user) => {
    return User.findByIdAndUpdate(user._id, user, { new: true });
  };
  deleteUser = async (_id: string) => {
    return User.findByIdAndDelete(_id);
  };
  getAllUsers = async () => {
    return User.find();
  };
}
