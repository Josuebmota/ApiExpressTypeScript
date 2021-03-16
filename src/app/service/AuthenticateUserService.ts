import {getRepository} from 'typeorm'
import { compare } from 'bcryptjs';
import {sign }from 'jsonwebtoken'
import authConfig from '../../config/auth'

import AppError from '../../errors/AppError'

import {Request, Reponse} from './interface/IAuthenticateUserInterface'
import User from '../models/User'

class AuthenticateUserService{
  public async execute({email, password}:Request): Promise<Reponse>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({where:{email}})

    if(!user){
      throw new AppError('Combinação incorreta email e senha',401)
    }

    const passwordMatched = await compare(password, user.password)
    if(!passwordMatched){
      throw new AppError('Combinação incorreta email e senha',401)
    }

    const {secret,expiresIn} = authConfig.jwt

    const token = sign({},secret,{
      subject: user.id,
      expiresIn,
    })

    return{
      user,token
    }
  }
}

export default AuthenticateUserService
