import CreateUserService from "../service/CreateUserService"
import UpdateUserService from "../service/UpdateUserService"
import {Request, Response} from 'express'

class UserController{
  async store(request:Request, response:Response){
      const data = request.body;
      const createUser = new CreateUserService()

      const user = await createUser.execute(data);

      return response.status(201).json(user)

  }

  async update(request:Request, response:Response){
      const data = request.body;
      const updateUser = new UpdateUserService()

      const user = await updateUser.execute(data);

      return response.status(204).json()

  }
}

export default new UserController();
