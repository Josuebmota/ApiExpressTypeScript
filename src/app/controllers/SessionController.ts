import AuthenticateUserService from "../service/AuthenticateUserService"
import {Request, Response} from 'express'

class SessionController{
  async login(request:Request,response:Response){
      const {email, password} = request.body;
      const  authenticateUser = new AuthenticateUserService()

      const {user,token} = await authenticateUser.execute({email,password});

      return response.status(201).json({user, token})

  }
}

  export default new SessionController();

