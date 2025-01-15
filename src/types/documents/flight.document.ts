import { Document } from "mongoose";

export interface flight extends Document {
  _id: string;
  origin: string;
  destination: string;
  departureDate: string;
  totalSeatsLeft: number;

}

