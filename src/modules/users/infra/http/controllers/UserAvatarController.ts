import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UsersController {
  public async update(request: Request, response: Response) {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.status(204).json();
  }
}

export default new UsersController();
