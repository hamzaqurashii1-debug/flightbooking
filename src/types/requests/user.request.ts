export interface saveReqUser {
  email: string;
  name?: string;
}
export interface updateReqUser {
  _id: string;
  email: string;
  name?: string;
}

export interface deleteReqUser {
  _id: string;
}
export interface getUserByEmailReq {
  email: string;
}
export interface getOtherUsers {
  _id: string;
}
export interface getReqUser {
  _id: string;
}
