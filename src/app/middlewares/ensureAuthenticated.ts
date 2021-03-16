import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'

import authConfig from '../../config/auth'

import AppError from '../../errors/AppError'

import TokenPayload from './interface/TokenPayload'


export default function ensureAuthenticated(request:Request, reponse:Response,next:NextFunction){
  const authHeader = request.headers.authorization

  if(!authHeader){
    throw new AppError('Token jwt ausente',401)
  }

  const [, token] = authHeader.split(' ');

  try{
    const decoded =verify(token, authConfig.jwt.secret);
    const {sub} = decoded as TokenPayload;
    request.user = {
      id:sub,
    }
    return next()
  }catch(err){
    throw new AppError('Token Jwt Invalid',401)
  }
}
