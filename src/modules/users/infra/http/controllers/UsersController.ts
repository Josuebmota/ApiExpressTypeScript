import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response) {
    const data = request.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(data);

    return response.status(201).json(user);
  }
}

export default new UsersController();
