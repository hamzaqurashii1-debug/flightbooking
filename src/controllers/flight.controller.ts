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
import { mainFlight } from "../repositories/flight.repository";
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

@Route("flight")
@Tags("flight")
export class FlightController {
  constructor() {}
  @Security("BearerAuth")
  @Post("/getFlight")
  async getFlight(@Body() getReq: getReqFlight): Promise<flightResponse> {
    const Flight: flight | any = await new mainFlight().getFlight(getReq._id);
    if (Flight === null) throw new CustomError(404, "Flight not found");
    return <flightResponse>Flight;
  }
  @Security("BearerAuth")
  @Post("/getFlights")
  async getFlights(@Body() getReq: getFlights): Promise<flightResponse> {
    const Flight: flight | any = await new mainFlight().getFlights(getReq);
    if (Flight === null) return Flight;
    return <flightResponse>Flight;
  }
  @Security("BearerAuth")
  @Post("/saveFlight")
  async saveFlight(@Body() saveReq: saveReqFlight): Promise<flightResponse> {
    const Flight: flight = await new mainFlight().saveFlight(<flight>saveReq);
    return <flightResponse>Flight;
  }
  @Security("BearerAuth")
  @Put("/updateFlight")
  async updateFlight(@Body() updateReq: updateReqFlight): Promise<flightResponse> {
    const Flight: flight | any = await new mainFlight().updateFlight(<flight>updateReq);
    if (Flight === null) throw new CustomError(404, "flight not found");
    return <flightResponse>Flight;
  }
  @Security("BearerAuth")
  @Delete("/deleteFlight/{_id}")
  @SuccessResponse("200", "data deleted")
  async deleteFlight(@Path('_id') getReq: string): Promise<flightResponse> {
    const data = await new mainFlight().deleteFlight(getReq);
    return <flightResponse>data;
  }
}
