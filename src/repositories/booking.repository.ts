import { booking } from "../types/documents/booking.document";
import { Booking } from "../models/booking.model";
import mongoose from "mongoose";
import { getBookings, getReqBooking } from "../types/requests/booking.request";
import { Flight } from "../models/flight.model";

export class mainBooking {
  constructor() {}
  getBooking = async (_id: string) => {
    return Booking.findById(_id);
  };
  saveBooking = async (req: booking) => {
    const newBooking = await new Booking(req).save();
    console.log(req.passengers.length, req.flight);
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.flight,
      { $inc: { totalSeatsLeft: -req.passengers.length } },
      { new: true }
    ).exec();

    return Booking.aggregate([
      { $match: { _id: newBooking._id } },
      {
        $lookup: {
          from: "flights",
          localField: "flight",
          foreignField: "_id",
          as: "bookedFlight",
        },
      },
      {
        $unwind: {
          path: "$bookedFlight",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "bookedBy",
        },
      },
      {
        $unwind: {
          path: "$bookedBy",
        },
      },
    ]);
  };
  updateBooking = async (booking: booking) => {
    return Booking.findByIdAndUpdate(booking._id, booking, { new: true });
  };
  deleteBooking = async (_id: string) => {
    return Booking.findByIdAndDelete(_id);
  };
  getAllBookings = async () => {
    return Booking.find();
  };
}
