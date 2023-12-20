import { Router } from 'express';

export class ChangeLocaleRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/');

    return router;
  }
}
