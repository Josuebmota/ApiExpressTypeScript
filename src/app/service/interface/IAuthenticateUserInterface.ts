import User from "../../models/User";

export interface Request {
  email: string,
  password: string,
}

export interface Reponse {
  user: User,
  token: string,
}

