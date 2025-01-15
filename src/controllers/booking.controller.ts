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
import { mainBooking } from "../repositories/booking.repository";
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
  Security,
  Example
} from "tsoa";

@Route("booking")
@Tags("booking")
export class BookingController {
  constructor() {}
  @Security("BearerAuth")
  @Post("/getBooking")
  async getBooking(@Body() getReq: getReqBooking): Promise<bookingResponse> {
    const Booking: booking | any = await new mainBooking().getBooking(getReq._id);
    if (Booking === null) throw new CustomError(404, "Booking not found");
    return <bookingResponse>Booking;
  }
  @Security("BearerAuth")
  @Post("/saveBooking")
  async saveBooking(@Body() saveReq: saveReqBooking): Promise<bookingResponse> {
    const Booking: booking | any = await new mainBooking().saveBooking(<booking>saveReq);
    return <bookingResponse>Booking;
  }
  @Security("BearerAuth")
  @Put("/updateBooking")
  async updateBooking(@Body() updateReq: updateReqBooking): Promise<bookingResponse> {
    const Booking: booking | any = await new mainBooking().updateBooking(<booking>updateReq);
    if (Booking === null) throw new CustomError(404, "booking not found");
    return <bookingResponse>Booking;
  }
  @Security("BearerAuth")
  @Delete("/deleteBooking/{_id}")
  @SuccessResponse("200", "data deleted")
  async deleteBooking(@Path('_id') getReq: string): Promise<bookingResponse> {
    const data = await new mainBooking().deleteBooking(getReq);
    return <bookingResponse>data;
  }
  @Security("BearerAuth")
  @Get("/getAllBookings")
  async getAllBookings(): Promise<bookingResponse[]> {
    const Booking: booking[] = await new mainBooking().getAllBookings();
    return <bookingResponse[]>Booking;
  }
}
