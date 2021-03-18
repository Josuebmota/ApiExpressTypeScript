import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response) {
    const {
      socialName,
      firstName,
      lastName,
      birthDate,
      cpf,
      email,
      password,
      status,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      socialName,
      firstName,
      lastName,
      birthDate,
      cpf,
      email,
      password,
      status,
    });

    return response.status(201).json(classToClass(user));
  }
}

export default new UsersController();
