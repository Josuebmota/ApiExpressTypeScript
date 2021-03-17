export default interface IUpdateUserDTO {
  user_id: string;
  socialName?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  email: string;
  password?: string;
  oldPassword?: string;
  status?: string;
}
