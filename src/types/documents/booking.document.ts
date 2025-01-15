import { Document } from "mongoose";

export interface booking extends Document {
  _id: string;
  flight: string;
  passengers: string[];
  user: string;
}

