import {getRepository} from 'typeorm'
import { compare } from 'bcryptjs';
import {hash} from 'bcryptjs'

import AppError from '../../errors/AppError'

import User from '../models/User';
import Request from './interface/IUpdateUserInterface'

class UpdateUserService{
  public async execute({user_id, socialName,firstName,lastName,birthDate,email,password,oldPassword,status }:Request): Promise<User>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({where:{user_id}})

    if(!user){
      throw new AppError('Usuário não encontrado', 404)
    }

    const checkUserEmail = await usersRepository.findOne({
      where:{email},
    });

    if(checkUserEmail && checkUserEmail.id !==user.id){
      throw new AppError('Email já existente')
    }

    user.socialName = socialName;
    user.firstName = firstName;
    user.lastName = lastName;
    user.birthDate = birthDate;
    user.email = email;
    user.status = status;

    if(password){
      if(!oldPassword) throw new AppError("Old password is required")

      const isEqualPassword =  await compare(oldPassword, user.password)

      if(!isEqualPassword)
        throw new AppError('Password antigo não é igual ao vigente')

      user.password = await  hash(password, 8);
    }

    await usersRepository.save(user)

    return user
  }
}

export default UpdateUserService;
