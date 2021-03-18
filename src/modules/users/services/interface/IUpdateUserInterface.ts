export default interface IRequest {
  user_id: string;
  socialName?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  cpf?: string;
  email: string;
  password?: string;
  oldPassword?: string;
  status?: string;
}
