export default interface ICreateUserDTO {
  socialName?: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  cpf: string;
  email: string;
  password: string;
  status?: string;
}
