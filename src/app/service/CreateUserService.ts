import {getRepository} from 'typeorm'
import {hash} from 'bcryptjs'
import AppError from '../../errors/AppError'

import User from '../models/User';
import Request from './interface/ICreateUserInterface'

class CreateUserService{
  public async execute({socialName,firstName,lastName,birthDate,email,password,status }:Request): Promise<User>{
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where:{email},
    });

    if(checkUserExists){
      throw new AppError('Email já existente')
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      socialName,firstName,lastName,birthDate,email,password:hashedPassword,status
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
