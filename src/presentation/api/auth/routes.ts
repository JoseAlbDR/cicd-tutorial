import { Router } from 'express';
import { AuthService } from '../services/auth.service';
import { ErrorHandler } from '../../../domain';
import { AuthController } from './controller';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const authService = new AuthService();
    const errorHandler = new ErrorHandler();
    const authController = new AuthController(authService, errorHandler);

    router.post('/signup', authController.signup);
    router.post('/login', authController.login);

    return router;
  }
}
