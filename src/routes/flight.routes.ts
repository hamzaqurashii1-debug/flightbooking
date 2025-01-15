import express from "express";
import CustomError from "../utils/error";
import { flight } from "../types/documents/flight.document";
import {
  deleteReqFlight,
  getOtherFlights,
  getReqFlight,
  getFlights,
  saveReqFlight,
  updateReqFlight,
} from "../types/requests/flight.request";
import { flightResponse } from "../types/responses/flight.response";
import { FlightController } from "../controllers/flight.controller";

class FlightRoute {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.route();
  }
  route() {
    console.log('')
    this.router.post("/saveFlight", async (req, res, next) => {
      try {
        const reqFlight: saveReqFlight = req.body;
        const Flight: flightResponse = await new FlightController().saveFlight(reqFlight);
        res.send(Flight);
      } catch (error) {
        console.log(error);
      }
    });
    this.router.post("/auth", async (req, res, next) => {
      try {
        const reqFlight: getFlights = req.body;
        const Flight: flightResponse = await new FlightController().getFlights(
          reqFlight
        );
        res.json(Flight);
      } catch (error) {
        console.log(error);
      }
    });

    this.router.put("/updateFlight", async (req, res, next) => {
      try {
        const reqFlight: updateReqFlight = { ...req.body, _id: req.body._id };
        const Flight: updateReqFlight = await new FlightController().updateFlight(
          reqFlight
        );
        res.send(Flight);
      } catch (error) {
        next(new CustomError(404, "flight id not found"));
      }
    });

    this.router.delete(
      "/deleteFlight/:_id",
      async (req: any, res: any, next: any) => {
        try {
          const reqFlight: deleteReqFlight = {
            _id: req.params._id,
          };
          const Flight: deleteReqFlight | any =
            await new FlightController().deleteFlight(reqFlight._id);
          res.send(Flight);
        } catch (error) {
          next(new CustomError(404, "flight id not found"));
        }
      }
    );
    this.router.post("/getFlights", async (req: any, res: any, next: any) => {

      try {
        const Flight = await new FlightController().getFlights(req.body);
        res.send(Flight);
      } catch (error) {
        next(new CustomError(404, "flight id not found"));
      }
    });
  }
}

export const FlightRouteApi = new FlightRoute().router;
