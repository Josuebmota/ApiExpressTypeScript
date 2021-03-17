import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IRequest from './interface/ISendForgotPasswordEmailInterface';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuario não encontrado', 404);
    }

    // const { token } = await this.userTokenRepository.generate(user.id);

    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
