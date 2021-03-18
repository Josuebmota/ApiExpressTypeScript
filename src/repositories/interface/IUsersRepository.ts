import User from '@modules/user/infra/typeorm/entities/User';
import ICreateUser from '@modules/user/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUser): Promise<User>;
  save(user: User): Promise<User>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
}