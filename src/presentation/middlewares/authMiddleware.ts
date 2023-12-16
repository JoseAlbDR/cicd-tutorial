import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../domain';
import { JWTAdapter } from '../../config';

export class AuthMiddleware {
  constructor(private readonly jwtAdapter: JWTAdapter) {}

  public authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { token } = req.signedCookies as Record<string, string>;

    if (!token) return res.status(401).json('Invalid authentication');

    const payload = await this.jwtAdapter.validateToken(token);

    if (!token) return res.status(401).json('Invalid authentication');

    console.log({ payload });

    req.body.user = payload;
    next();
    try {
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.unauthorized('Invalid authentication');
    }
  };
}
