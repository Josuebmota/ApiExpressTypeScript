import { injectable, inject } from 'tsyringe';
import { compare, hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IRequest from './interface/IUpdateUserInterface';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    socialName,
    firstName,
    lastName,
    birthDate,
    email,
    password,
    oldPassword,
    status,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const checkUserEmail = await this.usersRepository.findByEmail(email);

    if (checkUserEmail && checkUserEmail.id !== user.id) {
      throw new AppError('Email já existente');
    }

    user.socialName = socialName || user.socialName;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.birthDate = birthDate || user.birthDate;
    user.email = email;
    user.status = status || user.status;

    if (password) {
      if (!oldPassword) throw new AppError('Senha antiga é necessaria');

      const isEqualPassword = await compare(oldPassword, user.password);

      if (!isEqualPassword)
        throw new AppError('Password antigo não é igual ao vigente');

      user.password = await hash(password, 8);
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
