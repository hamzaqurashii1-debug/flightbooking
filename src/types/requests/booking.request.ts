
export interface saveReqBooking {
  flight: string;
  passengers: string[];
  user: string;
}
export interface updateReqBooking {
  _id: string;
  flight: string;
  passengers: string[];
  user: string;
}

export interface deleteReqBooking {
  _id: string;
}
export interface getBookings {
  email:string;
}

export interface getOtherBookings {
  _id: string;
}
export interface getReqBooking {
  _id: string;
}
