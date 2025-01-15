import { flight } from "../types/documents/flight.document";
import { Flight } from "../models/flight.model";
import mongoose from "mongoose";
import { getFlights, getReqFlight } from "../types/requests/flight.request";

export class mainFlight {
  constructor() {}
  getFlight = async (_id: string) => {
    return Flight.findById(_id);
  };
  getFlights = async (req: getFlights) => {
    const dateString = "2025-01-15"; // Date in "YYYY-MM-DD" format
    const startOfDay = new Date(dateString); // Start of the day (00:00:00)
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);
    return await Flight.aggregate([
      {
        $match: {
          origin: req.origin,
          destination: req.destination,
          $and: [
            {
              totalSeatsLeft: {
                $gte: req.numberOfPassengers,
              },
            },
            {
              departureDate: {
                $gte: startOfDay,
                $lte: endOfDay,
              },
            },
          ],
        },
      },
    ]);
  };
  saveFlight = async (flight: flight) => {
    return new Flight(flight).save();
  };
  updateFlight = async (flight: flight) => {
    return Flight.findByIdAndUpdate(flight._id, flight, { new: true });
  };
  deleteFlight = async (_id: string) => {
    return Flight.findByIdAndDelete(_id);
  };
  getAllFlights = async () => {
    return Flight.find();
  };
}
