export default interface ICreateUserDTO {
  socialName?: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  password: string;
  status?: string;
}
