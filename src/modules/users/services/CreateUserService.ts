import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IRequest from './interface/ICreateUserInterface';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hasProvider: IHashProvider,
  ) {}

  public async execute({
    socialName,
    firstName,
    lastName,
    birthDate,
    email,
    password,
    status,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email já existente');
    }

    const hashedPassword = await this.hasProvider.generateHash(password);

    const user = await this.usersRepository.create({
      socialName,
      firstName,
      lastName,
      birthDate,
      email,
      password: hashedPassword,
      status,
    });

    return user;
  }
}

export default CreateUserService;
