import { injectable, inject } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IRequest from './interface/IResetPasswordService';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hasProvider: IHashProvider,
  ) {}

  public async execute({
    token,
    password,
    password_confirmation,
  }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token do usuario não existe', 404);
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuario não encontrado', 404);
    }
    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado.');
    }

    if (password !== password_confirmation) {
      throw new AppError('Senhas devem ser iguais.');
    }

    user.password = await this.hasProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
