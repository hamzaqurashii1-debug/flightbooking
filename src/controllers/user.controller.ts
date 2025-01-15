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
import { mainUser } from "../repositories/user.repository";
import CustomError from "../utils/error";
import {
  Get,
  Put,
  Post,
  Delete,
  Route,
  Tags,
  Body,
  Path,
  Query,
  SuccessResponse,
} from "tsoa";

@Route("user")
@Tags("user")
export class UserController {
  constructor() {}
  @Post("/auth")
  async getUserByEmail(@Body() getReq: getUserByEmailReq): Promise<userResponse> {
    const User: user | any = await new mainUser().getUserByEmail(getReq.email);
    if (User === null) return User;
    return <userResponse>User;
  }
  @Post("/saveUser")
  async saveUser(@Body() saveReq: saveReqUser): Promise<userResponse> {
    const User: user = await new mainUser().saveUser(<user>saveReq);
    return <userResponse>User;
  }
  @Put("/updateUser")
  async updateUser(@Body() updateReq: updateReqUser): Promise<userResponse> {
    const User: user | any = await new mainUser().updateUser(<user>updateReq);
    if (User === null) throw new CustomError(404, "user not found");
    return <userResponse>User;
  }
  @Delete("/deleteUser/{_id}")
  @SuccessResponse("200", "data deleted")
  async deleteUser(@Path('_id') getReq: string): Promise<userResponse> {
    const data = await new mainUser().deleteUser(getReq);
    return <userResponse>data;
  }
}
