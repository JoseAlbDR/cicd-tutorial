import { Router } from 'express';
import { ProductRoutes } from './products/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/v1/products', ProductRoutes.routes);
    router.use('/api/v1/tags');

    return router;
  }
}
