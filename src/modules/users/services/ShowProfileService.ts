import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ShowProfileService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('Usuario não encontrado', 404);

    return user;
  }
}

export default ShowProfileService;
