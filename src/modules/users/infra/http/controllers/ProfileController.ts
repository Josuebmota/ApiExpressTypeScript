import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

class ProfileController {
  public async show(request: Request, response: Response) {
    const { id } = request.user;
    const showProfileService = container.resolve(ShowProfileService);
    const profileUser = await showProfileService.execute(id);
    return response.status(200).json(classToClass(profileUser));
  }

  public async update(request: Request, response: Response) {
    const data = request.body;
    const updateUser = container.resolve(UpdateUserService);

    await updateUser.execute(data);

    return response.status(204).json();
  }
}

export default new ProfileController();
