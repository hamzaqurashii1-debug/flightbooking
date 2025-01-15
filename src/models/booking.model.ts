import { model, Schema } from "mongoose";
import { booking } from "../types/documents/booking.document";

const bookingSchema = new Schema(
  {
    flight: {type: Schema.Types.ObjectId, ref: "flights"},
    passengers: [{type:String}],
    user: {type: Schema.Types.ObjectId, ref: "users"},
  },
  { timestamps: true }
);

export const Booking = model<booking>("Booking", bookingSchema);
