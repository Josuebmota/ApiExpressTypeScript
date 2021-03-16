import UpdateUserAvatarService from "../service/UpdateUserAvatarService"

import {Request, Response} from 'express'

class UserAvatarController {
  async update(request:Request, response:Response){
      const updateUserAvatar = new UpdateUserAvatarService()

      const user = await updateUserAvatar.execute({user_id:request.user.id,avatarFilename:request.file.filename});

      return response.status(204).json()

  }
}

export default new UserAvatarController()
