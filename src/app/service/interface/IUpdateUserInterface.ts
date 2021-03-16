export default interface Request{
  user_id: string,
  socialName?: string,
  firstName?: string,
  lastName?: string,
  birthDate?: Date,
  email: string,
  password?: string,
  oldPassword?: string,
  status?: string,
}
