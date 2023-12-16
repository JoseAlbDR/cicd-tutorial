import { Router } from 'express';
import { ProductRoutes } from './api/products/routes';
import { TagsRoutes } from './api/tags/routes';
import { ProductWebRoutes } from './web/products/routes';
import { AuthRoutes } from './api/auth/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // API routes
    router.use('/api/v1/products', ProductRoutes.routes);
    router.use('/api/v1/tags', TagsRoutes.routes);
    router.use('/api/v1/auth', AuthRoutes.routes);

    // ViEWS routes
    router.use('/', ProductWebRoutes.routes);

    return router;
  }
}
