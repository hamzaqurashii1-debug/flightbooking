import { Document } from "mongoose";

export interface user extends Document {
  _id: string;
  email: string;
  name?: string;
}

