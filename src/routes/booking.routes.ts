import express from "express";
import CustomError from "../utils/error";
import { booking } from "../types/documents/booking.document";
import {
  deleteReqBooking,
  getOtherBookings,
  getReqBooking,
  getBookings,
  saveReqBooking,
  updateReqBooking,
} from "../types/requests/booking.request";
import { bookingResponse } from "../types/responses/booking.response";
import { BookingController } from "../controllers/booking.controller";

class BookingRoute {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.route();
  }
  route() {
    console.log('')
    this.router.post("/saveBooking", async (req, res, next) => {
      try {
        const reqBooking: saveReqBooking = req.body;
        const Booking: bookingResponse = await new BookingController().saveBooking(reqBooking);
        res.send(Booking);
      } catch (error) {
        console.log(error);
      }
    });

    this.router.put("/updateBooking", async (req, res, next) => {
      try {
        const reqBooking: updateReqBooking = { ...req.body, _id: req.body._id };
        const Booking: updateReqBooking = await new BookingController().updateBooking(
          reqBooking
        );
        res.send(Booking);
      } catch (error) {
        next(new CustomError(404, "booking id not found"));
      }
    });

    this.router.delete(
      "/deleteBooking/:_id",
      async (req: any, res: any, next: any) => {
        try {
          const reqBooking: deleteReqBooking = {
            _id: req.params._id,
          };
          const Booking: deleteReqBooking | any =
            await new BookingController().deleteBooking(reqBooking._id);
          res.send(Booking);
        } catch (error) {
          next(new CustomError(404, "booking id not found"));
        }
      }
    );
  }
}

export const BookingRouteApi = new BookingRoute().router;
