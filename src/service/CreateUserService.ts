import {getRepository} from 'typeorm'
import User from '../models/User';

class CreateUserService{
  public async execute(): Promise<User>{
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where:{email},
    });
  }
}

