import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password, passwordConfirmation } = request.body;
    const resetPasswordController = container.resolve(ResetPasswordService);

    await resetPasswordController.execute({
      token,
      password,
      passwordConfirmation,
    });

    return response.status(204).json();
  }
}

export default new ResetPasswordController();
