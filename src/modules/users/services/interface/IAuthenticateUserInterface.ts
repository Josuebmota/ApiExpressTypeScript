import User from '@modules/users/infra/typeorm/entities/User';

export interface IRequest {
  email: string;
  password: string;
}

export interface IReponse {
  user: User;
  token: string;
}
