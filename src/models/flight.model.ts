import { model, Schema } from "mongoose";
import { flight } from "../types/documents/flight.document";

const flightSchema = new Schema(
  {
    origin: String,
    destination: String,
    departureDate: Date,
    totalSeatsLeft: Number,
  },
  { timestamps: true }
);

export const Flight = model<flight>("Flight", flightSchema);
