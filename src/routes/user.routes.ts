import express from "express";
import CustomError from "../utils/error";
import { user } from "../types/documents/user.document";
import {
  deleteReqUser,
  getOtherUsers,
  getReqUser,
  getUserByEmailReq,
  saveReqUser,
  updateReqUser,
} from "../types/requests/user.request";
import { userResponse } from "../types/responses/user.response";
import { UserController } from "../controllers/user.controller";

class UserRoute {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.route();
  }
  route() {
    this.router.post("/saveUser", async (req, res, next) => {
      try {
        const reqUser: saveReqUser = req.body;
        const User: userResponse = await new UserController().saveUser(reqUser);
        res.send(User);
      } catch (error) {
        console.log(error);
      }
    });
    this.router.post("/auth", async (req, res, next) => {
      try {
        const reqUser: getUserByEmailReq = req.body;
        const User: userResponse = await new UserController().getUserByEmail(
          reqUser
        );
        res.json(User);
      } catch (error) {
        console.log(error);
      }
    });

    this.router.put("/updateUser", async (req, res, next) => {
      try {
        const reqUser: updateReqUser = { ...req.body, _id: req.body._id };
        const User: updateReqUser = await new UserController().updateUser(
          reqUser
        );
        res.send(User);
      } catch (error) {
        next(new CustomError(404, "user id not found"));
      }
    });

    this.router.delete(
      "/deleteUser/:_id",
      async (req: any, res: any, next: any) => {
        try {
          const reqUser: deleteReqUser = {
            _id: req.params._id,
          };
          const User: deleteReqUser | any =
            await new UserController().deleteUser(reqUser._id);
          res.send(User);
        } catch (error) {
          next(new CustomError(404, "user id not found"));
        }
      }
    );
  }
}

export const UserRouteApi = new UserRoute().router;
