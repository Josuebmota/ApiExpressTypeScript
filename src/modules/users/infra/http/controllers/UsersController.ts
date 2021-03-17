import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

class UsersController {
  public async create(request: Request, response: Response) {
    const data = request.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(data);

    return response.status(201).json(user);
  }

  public async update(request: Request, response: Response) {
    const data = request.body;
    const updateUser = container.resolve(UpdateUserService);

    await updateUser.execute(data);

    return response.status(204).json();
  }
}

export default new UsersController();
