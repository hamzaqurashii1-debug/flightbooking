import express from "express";

import { UserRouteApi } from "./user.routes";
import { FlightRouteApi } from "./flight.routes";
import { authenticateJWT } from "../middleware";
import { BookingRouteApi } from "./booking.routes";

export class MainRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  routes() {
    this.router.get("/", authenticateJWT, (req, res) => {
      res.send("heelo world");
    });
    this.router.use("/user", UserRouteApi);
    this.router.use("/flight", authenticateJWT, FlightRouteApi);
    this.router.use("/booking", authenticateJWT, BookingRouteApi);
  }
}
export const MainApi = new MainRouter().router;
