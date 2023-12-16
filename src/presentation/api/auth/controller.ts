import { Request, Response } from 'express';
import { CustomError, ErrorHandler, SignupDto } from '../../../domain';
import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly errorHandler: ErrorHandler
  ) {}

  signup = (req: Request, res: Response) => {
    const [error, signupDto] = SignupDto.create(req.body);

    if (error)
      return this.errorHandler.handleError(CustomError.badRequest(error), res);

    this.authService
      .signup(signupDto!)
      .then((user) => res.status(201).json(user))
      .catch((err) => this.errorHandler.handleError(err, res));
  };
}
