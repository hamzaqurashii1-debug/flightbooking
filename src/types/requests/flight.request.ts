import { Example } from "tsoa";
export class saveReqFlight {
  @Example("2025-01-15T10:30:00Z")
  public departureDate: string;
  public origin: string;
  public destination: string;
  public totalSeatsLeft: number;

  constructor(
    departureDate: string,
    origin: string,
    destination: string,
    totalSeatsLeft: number,
  ) {
    this.departureDate = departureDate;
    this.origin = origin;
    this.destination = destination;
    this.totalSeatsLeft = totalSeatsLeft;
  }
}
export interface updateReqFlight {
  _id: string;
  origin: string;
  destination: string;
  departureDate: string;
  totalSeatsLeft: number;
}

export interface deleteReqFlight {
  _id: string;
}
export class getFlights {
  @Example("2025-01-15")
  public departureDate: string;
  public origin: string;
  public destination: string;
  public numberOfPassengers: number;


  constructor(
    departureDate: string,
    origin: string,
    destination: string,
    numberOfPassengers: number,

  ) {
    this.departureDate = departureDate;
    this.origin = origin;
    this.destination = destination;
    this.numberOfPassengers = numberOfPassengers;
  }
}

export interface getOtherFlights {
  _id: string;
}
export interface getReqFlight {
  _id: string;
}
