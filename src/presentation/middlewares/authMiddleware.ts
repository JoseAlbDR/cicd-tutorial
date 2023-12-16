import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../domain';

export class AuthMiddleware {
  static async authenticateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { token } = req.signedCookies as Record<string, string>;

    if (!token) throw CustomError.unauthorized('Invalid authentication');
  }
}
